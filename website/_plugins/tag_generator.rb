module Jekyll
  # Base class for the tag pages with all the shared behaviour
  class BaseTagPage < Page
    def initialize(site, base, dir)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process @name
      self.read_yaml File.join(base, '_layouts'), layout_page
    end

    # Implement this function in child classes
    # Expected to return a string containing the filename of the layout in _layouts
    def layout_page
      raise
    end
  end

  # Represents a specific tag page
  class TagPage < BaseTagPage
    def initialize(site, base, dir, tag)
      super(site, base, dir)
      self.data['tag'] = tag
    end

    def layout_page
      'tag_page.html'
    end
  end

  # Generate a page for every tag
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.has_key? 'tag_page'
        dir = site.config['tag_page_dir'] || 'tag'
        site.tags.keys.each do |tag|
          write_tag_page(site, File.join(dir, tag), tag)
        end
      end
    end

    private

    def write_tag_page(site, dir, tag)
      page = TagPage.new(site, site.source, dir, tag)
      page.render(site.layouts, site.site_payload)
      page.write(site.dest)
      site.pages << page
    end
  end

  # Represents a page with all the tags
  class TagIndexPage < BaseTagPage
    def layout_page
      'tag_index.html'
    end
  end

  # Generates a page with all tags
  class TagIndexGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.has_key? 'tag_index'
        dir = site.config['tag_index_dir'] || 'tags'
        write_tag_index(site, dir)
      end
    end

    private

    def write_tag_index(site, dir)
      page = TagIndexPage.new(site, site.source, dir)
      page.render(site.layouts, site.site_payload)
      page.write(site.dest)
      site.pages << page
    end
  end
end
