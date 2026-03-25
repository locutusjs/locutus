import { readFileSync } from 'node:fs'
import yaml from 'js-yaml'
import { describe, expect, it } from 'vitest'

type WorkflowStep = {
  env?: Record<string, string>
  name?: string
  uses?: string
  run?: string
  with?: Record<string, unknown>
}

type WorkflowJob = {
  permissions?: Record<string, string>
  steps?: WorkflowStep[]
}

type WorkflowDefinition = {
  jobs?: Record<string, WorkflowJob>
}

function loadCiWorkflow(): WorkflowDefinition {
  return yaml.load(readFileSync('.github/workflows/ci.yml', 'utf8')) as WorkflowDefinition
}

function findStep(job: WorkflowJob, name: string): WorkflowStep | undefined {
  return job.steps?.find((step) => step.name === name)
}

describe('ci workflow security hardening', () => {
  it('keeps the main ci job read-only on repository contents', () => {
    const workflow = loadCiWorkflow()
    const ciJob = workflow.jobs?.ci

    expect(ciJob?.permissions).toEqual({
      contents: 'read',
    })
  })

  it('publishes from the verified dist artifact instead of rebuilding in the release job', () => {
    const workflow = loadCiWorkflow()
    const releaseJob = workflow.jobs?.release

    expect(releaseJob?.permissions).toEqual({
      contents: 'write',
      'id-token': 'write',
    })
    expect(releaseJob?.steps?.some((step) => step.uses === 'actions/checkout@v6')).toBe(false)
    expect(releaseJob?.steps?.some((step) => step.uses === 'actions/download-artifact@v4')).toBe(true)
    expect(findStep(releaseJob as WorkflowJob, 'Build')).toBeUndefined()
    expect(findStep(releaseJob as WorkflowJob, 'Install Dependencies')).toBeUndefined()

    const downloadSteps = releaseJob?.steps?.filter((step) => step.uses === 'actions/download-artifact@v4') ?? []
    expect(downloadSteps).toHaveLength(2)
    expect(downloadSteps.at(0)?.with).toMatchObject({
      name: 'dist',
      path: 'dist',
    })
    expect(downloadSteps.at(1)?.with).toMatchObject({
      name: 'release-notes',
      path: '.',
    })
    const githubTokenExpression = '$' + '{{ github.token }}'
    const githubRepositoryExpression = '$' + '{{ github.repository }}'
    expect(findStep(releaseJob as WorkflowJob, 'Publish package and create GitHub release')?.env).toMatchObject({
      GH_TOKEN: githubTokenExpression,
      GH_REPO: githubRepositoryExpression,
    })
  })

  it('deploys the verified website artifact instead of rebuilding under write permissions', () => {
    const workflow = loadCiWorkflow()
    const deployJob = workflow.jobs?.['website-deploy']

    expect(deployJob?.permissions).toEqual({
      contents: 'write',
    })
    expect(deployJob?.steps?.some((step) => step.uses === 'actions/setup-node@v6')).toBe(false)
    expect(deployJob?.steps?.some((step) => step.uses === 'actions/download-artifact@v4')).toBe(true)
    expect(findStep(deployJob as WorkflowJob, 'Website Build')).toBeUndefined()

    const downloadStep = deployJob?.steps?.find((step) => step.uses === 'actions/download-artifact@v4')
    expect(downloadStep?.with).toMatchObject({
      name: 'website-public',
      path: 'website/public',
    })
  })
})
