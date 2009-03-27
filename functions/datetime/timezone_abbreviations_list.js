function timezone_abbreviations_list() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // +      input by: ChaosNo1
    // %        note 1: Based on list returned by PHP 5.2.6 (Windows)
    // *     example 1: var list = timezone_abbreviations_list()
    // *     example 1: list['acst'][0].timezone_id
    // *     returns 1: 'America/Porto_Acre'
     
    var timezone_abbreviations = {
      'acst' :
      [
        {'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Porto_Acre'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Eirunepe'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Rio_Branco'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'Brazil/Acre'
        }
      ],
      'act' :
      [
        {'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Porto_Acre'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Eirunepe'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Rio_Branco'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'Brazil/Acre'
        }
      ],
      'addt' :
      [
        {'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Pangnirtung'
        }
      ],
      'adt' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Halifax'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Barbados'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Blanc-Sablon'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Glace_Bay'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Martinique'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Moncton'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Pangnirtung'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Thule'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Atlantic/Bermuda'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Canada/Atlantic'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Baghdad'
        }
      ],
      'aft' :
      [
        {'dst' : false,
          'offset' : 16200,
          'timezone_id' : 'Asia/Kabul'
        }
      ],
      'ahdt' :
      [
        {'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'America/Anchorage'
        },{
          'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'US/Alaska'
        }
      ],
      'ahst' :
      [
        {'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'America/Anchorage'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'America/Adak'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'America/Atka'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'US/Alaska'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'US/Aleutian'
        }
      ],
      'akdt' :
      [
        {'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Anchorage'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Juneau'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Nome'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Yakutat'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'US/Alaska'
        }
      ],
      'akst' :
      [
        {'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Anchorage'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Juneau'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Nome'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Yakutat'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'US/Alaska'
        }
      ],
      'aktst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Aqtobe'
        }
      ],
      'aktt' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Aqtobe'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Aqtobe'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Aqtobe'
        }
      ],
      'almst' :
      [
        {'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Almaty'
        }
      ],
      'almt' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Almaty'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Almaty'
        }
      ],
      'amst' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Yerevan'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Yerevan'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Boa_Vista'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Campo_Grande'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Cuiaba'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Manaus'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Porto_Velho'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Brazil/West'
        }
      ],
      'amt' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Yerevan'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Yerevan'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Boa_Vista'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Campo_Grande'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Cuiaba'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Manaus'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Porto_Velho'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'Brazil/West'
        },{
          'dst' : false,
          'offset' : 1172,
          'timezone_id' : 'Europe/Amsterdam'
        }
      ],
      'anast' :
      [
        {'dst' : true,
          'offset' : 43200,
          'timezone_id' : 'Asia/Anadyr'
        },{
          'dst' : true,
          'offset' : 46800,
          'timezone_id' : 'Asia/Anadyr'
        },{
          'dst' : true,
          'offset' : 50400,
          'timezone_id' : 'Asia/Anadyr'
        }
      ],
      'anat' :
      [
        {'dst' : false,
          'offset' : 39600,
          'timezone_id' : 'Asia/Anadyr'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Asia/Anadyr'
        },{
          'dst' : false,
          'offset' : 46800,
          'timezone_id' : 'Asia/Anadyr'
        }
      ],
      'ant' :
      [
        {'dst' : false,
          'offset' : -16200,
          'timezone_id' : 'America/Curacao'
        },{
          'dst' : false,
          'offset' : -16200,
          'timezone_id' : 'America/Aruba'
        }
      ],
      'apt' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Halifax'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Blanc-Sablon'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Glace_Bay'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Moncton'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Pangnirtung'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Puerto_Rico'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Canada/Atlantic'
        }
      ],
      'aqtst' :
      [
        {'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Aqtau'
        },{
          'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Aqtau'
        },{
          'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Aqtobe'
        }
      ],
      'aqtt' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Aqtau'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Aqtau'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Aqtobe'
        }
      ],
      'arst' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Buenos_Aires'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Buenos_Aires'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Buenos_Aires'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Catamarca'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/ComodRivadavia'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Cordoba'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Jujuy'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/La_Rioja'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Mendoza'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Rio_Gallegos'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/San_Juan'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Tucuman'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Ushuaia'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Catamarca'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Cordoba'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Jujuy'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Mendoza'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Rosario'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Antarctica/Palmer'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/Buenos_Aires'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/Catamarca'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/ComodRivadavia'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/Cordoba'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/Jujuy'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/La_Rioja'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/Mendoza'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/Rio_Gallegos'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/San_Juan'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/Tucuman'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Argentina/Ushuaia'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Catamarca'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Cordoba'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Jujuy'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Mendoza'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Rosario'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'Antarctica/Palmer'
        }
      ],
      'art' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Buenos_Aires'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Buenos_Aires'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Buenos_Aires'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Catamarca'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/ComodRivadavia'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Cordoba'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Jujuy'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/La_Rioja'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Mendoza'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Rio_Gallegos'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/San_Juan'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Tucuman'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Ushuaia'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Catamarca'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Cordoba'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Jujuy'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Mendoza'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Rosario'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'Antarctica/Palmer'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Buenos_Aires'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Catamarca'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/ComodRivadavia'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Cordoba'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Jujuy'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/La_Rioja'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Mendoza'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Rio_Gallegos'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/San_Juan'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Tucuman'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Ushuaia'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Catamarca'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Cordoba'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Jujuy'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Mendoza'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Rosario'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'Antarctica/Palmer'
        }
      ],
      'ashst' :
      [
        {'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Ashkhabad'
        },{
          'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Ashkhabad'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Ashgabat'
        },{
          'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Ashgabat'
        }
      ],
      'asht' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Ashkhabad'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Ashkhabad'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Ashgabat'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Ashgabat'
        }
      ],
      'ast' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Riyadh'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Anguilla'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Antigua'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Aruba'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Barbados'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Blanc-Sablon'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Curacao'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Dominica'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Glace_Bay'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Grenada'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Guadeloupe'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Halifax'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Martinique'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Miquelon'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Moncton'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Montserrat'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Pangnirtung'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Port_of_Spain'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Puerto_Rico'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Santo_Domingo'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/St_Kitts'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/St_Lucia'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/St_Thomas'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/St_Vincent'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Thule'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Tortola'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Virgin'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'Atlantic/Bermuda'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'Canada/Atlantic'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Aden'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Baghdad'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Bahrain'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Kuwait'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Qatar'
        }
      ],
      'awt' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Halifax'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Blanc-Sablon'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Glace_Bay'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Moncton'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Pangnirtung'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Puerto_Rico'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Canada/Atlantic'
        }
      ],
      'azomt' :
      [
        {'dst' : true,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Azores'
        }
      ],
      'azost' :
      [
        {'dst' : true,
          'offset' : -3600,
          'timezone_id' : 'Atlantic/Azores'
        },{
          'dst' : true,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Azores'
        }
      ],
      'azot' :
      [
        {'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Atlantic/Azores'
        },{
          'dst' : false,
          'offset' : -7200,
          'timezone_id' : 'Atlantic/Azores'
        }
      ],
      'azst' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Baku'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Baku'
        }
      ],
      'azt' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Baku'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Baku'
        }
      ],
      'bakst' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Baku'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Baku'
        }
      ],
      'bakt' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Baku'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Baku'
        }
      ],
      'bdst' :
      [
        {'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/London'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Belfast'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Gibraltar'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Guernsey'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Isle_of_Man'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Jersey'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'GB'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'GB-Eire'
        }
      ],
      'bdt' :
      [
        {'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Adak'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Atka'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Nome'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'US/Aleutian'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Dacca'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Dhaka'
        }
      ],
      'beat' :
      [
        {'dst' : false,
          'offset' : 9000,
          'timezone_id' : 'Africa/Mogadishu'
        },{
          'dst' : false,
          'offset' : 9000,
          'timezone_id' : 'Africa/Kampala'
        },{
          'dst' : false,
          'offset' : 9000,
          'timezone_id' : 'Africa/Nairobi'
        }
      ],
      'beaut' :
      [
        {'dst' : false,
          'offset' : 9885,
          'timezone_id' : 'Africa/Nairobi'
        },{
          'dst' : false,
          'offset' : 9885,
          'timezone_id' : 'Africa/Dar_es_Salaam'
        },{
          'dst' : false,
          'offset' : 9885,
          'timezone_id' : 'Africa/Kampala'
        }
      ],
      'bmt' :
      [
        {'dst' : false,
          'offset' : -14308,
          'timezone_id' : 'America/Barbados'
        },{
          'dst' : false,
          'offset' : -3996,
          'timezone_id' : 'Africa/Banjul'
        },{
          'dst' : false,
          'offset' : 6264,
          'timezone_id' : 'Europe/Tiraspol'
        },{
          'dst' : false,
          'offset' : 6264,
          'timezone_id' : 'Europe/Chisinau'
        }
      ],
      'bnt' :
      [
        {'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Asia/Brunei'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Brunei'
        }
      ],
      'bortst' :
      [
        {'dst' : true,
          'offset' : 30000,
          'timezone_id' : 'Asia/Kuching'
        }
      ],
      'bort' :
      [
        {'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Asia/Kuching'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Kuching'
        }
      ],
      'bost' :
      [
        {'dst' : true,
          'offset' : -12756,
          'timezone_id' : 'America/La_Paz'
        }
      ],
      'bot' :
      [
        {'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/La_Paz'
        }
      ],
      'brst' :
      [
        {'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Sao_Paulo'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Araguaina'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Bahia'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Belem'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Fortaleza'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Maceio'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Recife'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'Brazil/East'
        }
      ],
      'brt' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Sao_Paulo'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Araguaina'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Bahia'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Belem'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Fortaleza'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Maceio'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Recife'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'Brazil/East'
        }
      ],
      'bst' :
      [
        {'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/London'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/London'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'America/Adak'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'America/Atka'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'America/Nome'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Midway'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Pago_Pago'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Samoa'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'US/Aleutian'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'US/Samoa'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Belfast'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Guernsey'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Isle_of_Man'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Jersey'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'GB'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'GB-Eire'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Eire'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Belfast'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Dublin'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Gibraltar'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Guernsey'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Isle_of_Man'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Jersey'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'GB'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'GB-Eire'
        }
      ],
      'btt' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Thimbu'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Thimphu'
        }
      ],
      'burt' :
      [
        {'dst' : false,
          'offset' : 23400,
          'timezone_id' : 'Asia/Calcutta'
        },{
          'dst' : false,
          'offset' : 23400,
          'timezone_id' : 'Asia/Dacca'
        },{
          'dst' : false,
          'offset' : 23400,
          'timezone_id' : 'Asia/Dhaka'
        },{
          'dst' : false,
          'offset' : 23400,
          'timezone_id' : 'Asia/Rangoon'
        }
      ],
      'cant' :
      [
        {'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Atlantic/Canary'
        }
      ],
      'capt' :
      [
        {'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'America/Anchorage'
        },{
          'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'US/Alaska'
        }
      ],
      'cast' :
      [
        {'dst' : false,
          'offset' : 34200,
          'timezone_id' : 'Australia/Adelaide'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Africa/Gaborone'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Africa/Khartoum'
        }
      ],
      'cat' :
      [
        {'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'America/Anchorage'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'US/Alaska'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Khartoum'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Blantyre'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Gaborone'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Harare'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Kigali'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Lusaka'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Maputo'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Windhoek'
        }
      ],
      'cawt' :
      [
        {'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'America/Anchorage'
        },{
          'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'US/Alaska'
        }
      ],
      'cddt' :
      [
        {'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Rankin_Inlet'
        }
      ],
      'cdt' :
      [
        {'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Chicago'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Havana'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'Cuba'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Atikokan'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Belize'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Cambridge_Bay'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Cancun'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Chihuahua'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Coral_Harbour'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Costa_Rica'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/El_Salvador'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Fort_Wayne'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Guatemala'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Indianapolis'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Knox'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Marengo'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Petersburg'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Vevay'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Vincennes'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Winamac'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indianapolis'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Iqaluit'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Kentucky/Louisville'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Kentucky/Monticello'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Knox_IN'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Louisville'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Managua'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Menominee'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Merida'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Mexico_City'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Monterrey'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/North_Dakota/Center'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/North_Dakota/New_Salem'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Pangnirtung'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Rainy_River'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Rankin_Inlet'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Tegucigalpa'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Winnipeg'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'Canada/Central'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'CST6CDT'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'Mexico/General'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/Central'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/East-Indiana'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/Indiana-Starke'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Shanghai'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Chongqing'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Chungking'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Harbin'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Kashgar'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Taipei'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Urumqi'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'PRC'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'ROC'
        }
      ],
      'cemt' :
      [
        {'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Berlin'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'CET'
        }
      ],
      'cest' :
      [
        {'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Berlin'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Kaliningrad'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Africa/Algiers'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Africa/Ceuta'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Africa/Tripoli'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Africa/Tunis'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Arctic/Longyearbyen'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Atlantic/Jan_Mayen'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'CET'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Amsterdam'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Andorra'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Athens'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Belgrade'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Bratislava'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Brussels'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Budapest'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Chisinau'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Copenhagen'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Gibraltar'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Kaliningrad'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Kiev'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Lisbon'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Ljubljana'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Luxembourg'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Madrid'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Malta'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Minsk'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Monaco'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Oslo'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Paris'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Podgorica'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Prague'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Riga'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Rome'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/San_Marino'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Sarajevo'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Simferopol'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Skopje'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Sofia'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Stockholm'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Tallinn'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Tirane'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Tiraspol'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Uzhgorod'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Vaduz'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Vatican'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Vienna'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Vilnius'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Warsaw'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Zagreb'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Zaporozhye'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Zurich'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Libya'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Poland'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Portugal'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'WET'
        }
      ],
      'cet' :
      [
        {'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Berlin'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Algiers'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Casablanca'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Ceuta'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Tripoli'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Tunis'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Arctic/Longyearbyen'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Atlantic/Jan_Mayen'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'CET'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Amsterdam'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Andorra'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Athens'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Belgrade'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Bratislava'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Brussels'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Budapest'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Chisinau'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Copenhagen'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Gibraltar'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Kaliningrad'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Kiev'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Lisbon'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Ljubljana'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Luxembourg'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Madrid'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Malta'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Minsk'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Monaco'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Oslo'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Paris'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Podgorica'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Prague'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Riga'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Rome'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/San_Marino'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Sarajevo'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Simferopol'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Skopje'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Sofia'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Stockholm'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Tallinn'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Tirane'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Tiraspol'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Uzhgorod'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Vaduz'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Vatican'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Vienna'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Vilnius'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Warsaw'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Zagreb'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Zaporozhye'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Zurich'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Libya'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Poland'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Portugal'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'WET'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Kaliningrad'
        }
      ],
      'cgst' :
      [
        {'dst' : true,
          'offset' : -3600,
          'timezone_id' : 'America/Scoresbysund'
        }
      ],
      'cgt' :
      [
        {'dst' : false,
          'offset' : -7200,
          'timezone_id' : 'America/Scoresbysund'
        }
      ],
      'chadt' :
      [
        {'dst' : true,
          'offset' : 49500,
          'timezone_id' : 'Pacific/Chatham'
        },{
          'dst' : true,
          'offset' : 49500,
          'timezone_id' : 'NZ-CHAT'
        }
      ],
      'chast' :
      [
        {'dst' : false,
          'offset' : 45900,
          'timezone_id' : 'Pacific/Chatham'
        },{
          'dst' : false,
          'offset' : 45900,
          'timezone_id' : 'NZ-CHAT'
        }
      ],
      'chat' :
      [
        {'dst' : false,
          'offset' : 30600,
          'timezone_id' : 'Asia/Harbin'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Harbin'
        }
      ],
      'chdt' :
      [
        {'dst' : true,
          'offset' : -19800,
          'timezone_id' : 'America/Belize'
        }
      ],
      'chost' :
      [
        {'dst' : true,
          'offset' : 36000,
          'timezone_id' : 'Asia/Choibalsan'
        }
      ],
      'chot' :
      [
        {'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Choibalsan'
        }
      ],
      'cit' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Dili'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Makassar'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Pontianak'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Ujung_Pandang'
        }
      ],
      'cjt' :
      [
        {'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Sakhalin'
        }
      ],
      'ckhst' :
      [
        {'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'Pacific/Rarotonga'
        }
      ],
      'ckt' :
      [
        {'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'Pacific/Rarotonga'
        }
      ],
      'clst' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Santiago'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Santiago'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Antarctica/Palmer'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Chile/Continental'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'Chile/Continental'
        }
      ],
      'clt' :
      [
        {'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Santiago'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Santiago'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'Antarctica/Palmer'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'Chile/Continental'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'Chile/Continental'
        }
      ],
      'cost' :
      [
        {'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Bogota'
        }
      ],
      'cot' :
      [
        {'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Bogota'
        }
      ],
      'cpt' :
      [
        {'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Chicago'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Atikokan'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Coral_Harbour'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Fort_Wayne'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Indianapolis'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Knox'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Marengo'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Petersburg'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Vevay'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Vincennes'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Winamac'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indianapolis'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Kentucky/Louisville'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Kentucky/Monticello'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Knox_IN'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Louisville'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Menominee'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Rainy_River'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Rankin_Inlet'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Winnipeg'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'Canada/Central'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'CST6CDT'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/Central'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/East-Indiana'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/Indiana-Starke'
        }
      ],
      'cst' :
      [
        {'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Chicago'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Havana'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'Cuba'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Atikokan'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Belize'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Cambridge_Bay'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Cancun'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Chihuahua'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Coral_Harbour'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Costa_Rica'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Detroit'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/El_Salvador'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Fort_Wayne'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Guatemala'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Hermosillo'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Indiana/Indianapolis'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Indiana/Knox'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Indiana/Marengo'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Indiana/Petersburg'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Indiana/Vevay'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Indiana/Vincennes'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Indiana/Winamac'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Indianapolis'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Iqaluit'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Kentucky/Louisville'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Kentucky/Monticello'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Knox_IN'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Louisville'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Managua'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Mazatlan'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Menominee'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Merida'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Mexico_City'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Monterrey'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/North_Dakota/Center'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/North_Dakota/New_Salem'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Pangnirtung'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Rainy_River'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Rankin_Inlet'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Regina'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Swift_Current'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Tegucigalpa'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'America/Winnipeg'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'Canada/Central'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'Canada/East-Saskatchewan'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'Canada/Saskatchewan'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'CST6CDT'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'Mexico/BajaSur'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'Mexico/General'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'US/Central'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'US/East-Indiana'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'US/Indiana-Starke'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'US/Michigan'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Chongqing'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Chungking'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Harbin'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Kashgar'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Macao'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Macau'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Shanghai'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Taipei'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Urumqi'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'PRC'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'ROC'
        },{
          'dst' : false,
          'offset' : 34200,
          'timezone_id' : 'Asia/Jayapura'
        },{
          'dst' : false,
          'offset' : 34200,
          'timezone_id' : 'Australia/Adelaide'
        },{
          'dst' : false,
          'offset' : 34200,
          'timezone_id' : 'Australia/Broken_Hill'
        },{
          'dst' : false,
          'offset' : 34200,
          'timezone_id' : 'Australia/Darwin'
        },{
          'dst' : false,
          'offset' : 34200,
          'timezone_id' : 'Australia/North'
        },{
          'dst' : false,
          'offset' : 34200,
          'timezone_id' : 'Australia/South'
        },{
          'dst' : false,
          'offset' : 34200,
          'timezone_id' : 'Australia/Yancowinna'
        },{
          'dst' : true,
          'offset' : 37800,
          'timezone_id' : 'Australia/Adelaide'
        },{
          'dst' : true,
          'offset' : 37800,
          'timezone_id' : 'Australia/Broken_Hill'
        },{
          'dst' : true,
          'offset' : 37800,
          'timezone_id' : 'Australia/Darwin'
        },{
          'dst' : true,
          'offset' : 37800,
          'timezone_id' : 'Australia/North'
        },{
          'dst' : true,
          'offset' : 37800,
          'timezone_id' : 'Australia/South'
        },{
          'dst' : true,
          'offset' : 37800,
          'timezone_id' : 'Australia/Yancowinna'
        }
      ],
      'cvst' :
      [
        {'dst' : true,
          'offset' : -3600,
          'timezone_id' : 'Atlantic/Cape_Verde'
        }
      ],
      'cvt' :
      [
        {'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Atlantic/Cape_Verde'
        },{
          'dst' : false,
          'offset' : -7200,
          'timezone_id' : 'Atlantic/Cape_Verde'
        }
      ],
      'cwst' :
      [
        {'dst' : false,
          'offset' : 31500,
          'timezone_id' : 'Australia/Eucla'
        },{
          'dst' : true,
          'offset' : 35100,
          'timezone_id' : 'Australia/Eucla'
        }
      ],
      'cwt' :
      [
        {'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Chicago'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Atikokan'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Coral_Harbour'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Fort_Wayne'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Indianapolis'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Knox'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Marengo'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Petersburg'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Vevay'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Vincennes'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Winamac'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Indianapolis'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Kentucky/Louisville'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Kentucky/Monticello'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Knox_IN'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Louisville'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Menominee'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Mexico_City'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Rainy_River'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Rankin_Inlet'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Winnipeg'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'Canada/Central'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'CST6CDT'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'Mexico/General'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/Central'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/East-Indiana'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'US/Indiana-Starke'
        }
      ],
      'chst' :
      [
        {'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Pacific/Guam'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Pacific/Saipan'
        }
      ],
      'dact' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Dacca'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Dhaka'
        }
      ],
      'davt' :
      [
        {'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Antarctica/Davis'
        }
      ],
      'ddut' :
      [
        {'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Antarctica/DumontDUrville'
        }
      ],
      'dusst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Dushanbe'
        },{
          'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Dushanbe'
        }
      ],
      'dust' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Dushanbe'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Dushanbe'
        }
      ],
      'easst' :
      [
        {'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'Chile/EasterIsland'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Chile/EasterIsland'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'Pacific/Easter'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Pacific/Easter'
        }
      ],
      'east' :
      [
        {'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'Chile/EasterIsland'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Chile/EasterIsland'
        },{
          'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'Pacific/Easter'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Pacific/Easter'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Indian/Antananarivo'
        }
      ],
      'eat' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Khartoum'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Addis_Ababa'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Asmara'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Asmera'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Dar_es_Salaam'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Djibouti'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Kampala'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Mogadishu'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Africa/Nairobi'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Indian/Antananarivo'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Indian/Comoro'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Indian/Mayotte'
        }
      ],
      'ect' :
      [
        {'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Guayaquil'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'Pacific/Galapagos'
        }
      ],
      'eddt' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Iqaluit'
        }
      ],
      'edt' :
      [
        {'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/New_York'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Cancun'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Detroit'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Fort_Wayne'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Grand_Turk'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Indiana/Indianapolis'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Indiana/Marengo'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Indiana/Vevay'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Indiana/Vincennes'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Indiana/Winamac'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Indianapolis'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Iqaluit'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Jamaica'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Kentucky/Louisville'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Kentucky/Monticello'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Louisville'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Montreal'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Nassau'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Nipigon'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Pangnirtung'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Port-au-Prince'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Santo_Domingo'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Thunder_Bay'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Toronto'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'Canada/Eastern'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'EST'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'EST5EDT'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'Jamaica'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'US/East-Indiana'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'US/Eastern'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'US/Michigan'
        }
      ],
      'eest' :
      [
        {'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Helsinki'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Africa/Cairo'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Amman'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Beirut'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Damascus'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Gaza'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Istanbul'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Nicosia'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'EET'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Egypt'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Athens'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Bucharest'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Chisinau'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Istanbul'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Kaliningrad'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Kiev'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Mariehamn'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Minsk'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Moscow'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Nicosia'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Riga'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Simferopol'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Sofia'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Tallinn'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Tiraspol'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Uzhgorod'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Vilnius'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Warsaw'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Zaporozhye'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Poland'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Turkey'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'W-SU'
        }
      ],
      'eet' :
      [
        {'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Helsinki'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Gaza'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Cairo'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Tripoli'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Amman'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Beirut'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Damascus'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Gaza'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Istanbul'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Nicosia'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'EET'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Egypt'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Athens'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Bucharest'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Chisinau'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Istanbul'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Kaliningrad'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Kiev'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Mariehamn'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Minsk'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Moscow'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Nicosia'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Riga'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Simferopol'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Sofia'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Tallinn'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Tiraspol'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Uzhgorod'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Vilnius'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Warsaw'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Europe/Zaporozhye'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Libya'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Poland'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Turkey'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'W-SU'
        }
      ],
      'egst' :
      [
        {'dst' : true,
          'offset' : 0,
          'timezone_id' : 'America/Scoresbysund'
        }
      ],
      'egt' :
      [
        {'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'America/Scoresbysund'
        }
      ],
      'ehdt' :
      [
        {'dst' : true,
          'offset' : -16200,
          'timezone_id' : 'America/Santo_Domingo'
        }
      ],
      'eit' :
      [
        {'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Jayapura'
        }
      ],
      'ept' :
      [
        {'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/New_York'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Detroit'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Iqaluit'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Montreal'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Nipigon'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Thunder_Bay'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Toronto'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'Canada/Eastern'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'EST'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'EST5EDT'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'US/Eastern'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'US/Michigan'
        }
      ],
      'est' :
      [
        {'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/New_York'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Antigua'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Atikokan'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Cambridge_Bay'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Cancun'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Cayman'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Chicago'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Coral_Harbour'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Detroit'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Fort_Wayne'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Grand_Turk'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Indianapolis'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Knox'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Marengo'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Petersburg'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Vevay'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Vincennes'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Indiana/Winamac'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Indianapolis'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Iqaluit'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Jamaica'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Kentucky/Louisville'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Kentucky/Monticello'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Knox_IN'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Louisville'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Managua'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Menominee'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Merida'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Montreal'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Nassau'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Nipigon'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Panama'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Pangnirtung'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Port-au-Prince'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Rankin_Inlet'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Santo_Domingo'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Thunder_Bay'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Toronto'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'Canada/Eastern'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'EST'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'EST5EDT'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'Jamaica'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'US/Central'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'US/East-Indiana'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'US/Eastern'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'US/Indiana-Starke'
        },{
          'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'US/Michigan'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/ACT'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Brisbane'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Canberra'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Currie'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Hobart'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Lindeman'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Melbourne'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/NSW'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Queensland'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Sydney'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Tasmania'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Australia/Victoria'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Melbourne'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/ACT'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Brisbane'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Canberra'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Currie'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Hobart'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Lindeman'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/NSW'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Queensland'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Sydney'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Tasmania'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Victoria'
        }
      ],
      'ewt' :
      [
        {'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/New_York'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Detroit'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Iqaluit'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Montreal'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Nipigon'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Thunder_Bay'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Toronto'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'Canada/Eastern'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'EST'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'EST5EDT'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'US/Eastern'
        },{
          'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'US/Michigan'
        }
      ],
      'fjst' :
      [
        {'dst' : true,
          'offset' : 46800,
          'timezone_id' : 'Pacific/Fiji'
        }
      ],
      'fjt' :
      [
        {'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Fiji'
        }
      ],
      'fkst' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'Atlantic/Stanley'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'Atlantic/Stanley'
        }
      ],
      'fkt' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'Atlantic/Stanley'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'Atlantic/Stanley'
        }
      ],
      'fnst' :
      [
        {'dst' : true,
          'offset' : -3600,
          'timezone_id' : 'America/Noronha'
        },{
          'dst' : true,
          'offset' : -3600,
          'timezone_id' : 'Brazil/DeNoronha'
        }
      ],
      'fnt' :
      [
        {'dst' : false,
          'offset' : -7200,
          'timezone_id' : 'America/Noronha'
        },{
          'dst' : false,
          'offset' : -7200,
          'timezone_id' : 'Brazil/DeNoronha'
        }
      ],
      'fort' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Aqtau'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Aqtau'
        }
      ],
      'frust' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Bishkek'
        },{
          'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Bishkek'
        }
      ],
      'frut' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Bishkek'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Bishkek'
        }
      ],
      'galt' :
      [
        {'dst' : false,
          'offset' : -21600,
          'timezone_id' : 'Pacific/Galapagos'
        }
      ],
      'gamt' :
      [
        {'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'Pacific/Gambier'
        }
      ],
      'gbgt' :
      [
        {'dst' : false,
          'offset' : -13500,
          'timezone_id' : 'America/Guyana'
        }
      ],
      'gest' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Tbilisi'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Tbilisi'
        }
      ],
      'get' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Tbilisi'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Tbilisi'
        }
      ],
      'gft' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Cayenne'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Cayenne'
        }
      ],
      'ghst' :
      [
        {'dst' : true,
          'offset' : 1200,
          'timezone_id' : 'Africa/Accra'
        }
      ],
      'gmt' :
      [
        {'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Abidjan'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Accra'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Bamako'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Banjul'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Bissau'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Conakry'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Dakar'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Freetown'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Malabo'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Monrovia'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Niamey'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Nouakchott'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Ouagadougou'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Porto-Novo'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Sao_Tome'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Timbuktu'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'America/Danmarkshavn'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Reykjavik'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Atlantic/St_Helena'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Eire'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Belfast'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Dublin'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Gibraltar'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Guernsey'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Isle_of_Man'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Jersey'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/London'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'GB'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'GB-Eire'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Iceland'
        }
      ],
      'gst' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Dubai'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Bahrain'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Muscat'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Qatar'
        }
      ],
      'gyt' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Guyana'
        },{
          'dst' : false,
          'offset' : -13500,
          'timezone_id' : 'America/Guyana'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Guyana'
        }
      ],
      'hadt' :
      [
        {'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'America/Adak'
        },{
          'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'America/Atka'
        },{
          'dst' : true,
          'offset' : -32400,
          'timezone_id' : 'US/Aleutian'
        }
      ],
      'hast' :
      [
        {'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'America/Adak'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'America/Atka'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'US/Aleutian'
        }
      ],
      'hdt' :
      [
        {'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'Pacific/Honolulu'
        },{
          'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'HST'
        },{
          'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'US/Hawaii'
        }
      ],
      'hkst' :
      [
        {'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Hong_Kong'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Hongkong'
        }
      ],
      'hkt' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Hong_Kong'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Hongkong'
        }
      ],
      'hovst' :
      [
        {'dst' : true,
          'offset' : 28800,
          'timezone_id' : 'Asia/Hovd'
        }
      ],
      'hovt' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Hovd'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Hovd'
        }
      ],
      'hpt' :
      [
        {'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'Pacific/Honolulu'
        },{
          'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'HST'
        },{
          'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'US/Hawaii'
        }
      ],
      'hst' :
      [
        {'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'Pacific/Honolulu'
        },{
          'dst' : false,
          'offset' : -37800,
          'timezone_id' : 'Pacific/Honolulu'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'HST'
        },{
          'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'US/Hawaii'
        },{
          'dst' : false,
          'offset' : -37800,
          'timezone_id' : 'HST'
        },{
          'dst' : false,
          'offset' : -37800,
          'timezone_id' : 'US/Hawaii'
        }
      ],
      'hwt' :
      [
        {'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'Pacific/Honolulu'
        },{
          'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'HST'
        },{
          'dst' : true,
          'offset' : -34200,
          'timezone_id' : 'US/Hawaii'
        }
      ],
      'ict' :
      [
        {'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Bangkok'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Phnom_Penh'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Saigon'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Vientiane'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Phnom_Penh'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Saigon'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Vientiane'
        }
      ],
      'iddt' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Jerusalem'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Tel_Aviv'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Israel'
        }
      ],
      'idt' :
      [
        {'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Jerusalem'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Gaza'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Asia/Tel_Aviv'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Israel'
        }
      ],
      'ihst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Colombo'
        }
      ],
      'iot' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Indian/Chagos'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Indian/Chagos'
        }
      ],
      'irdt' :
      [
        {'dst' : true,
          'offset' : 16200,
          'timezone_id' : 'Asia/Tehran'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Tehran'
        },{
          'dst' : true,
          'offset' : 16200,
          'timezone_id' : 'Iran'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Iran'
        }
      ],
      'irkst' :
      [
        {'dst' : true,
          'offset' : 28800,
          'timezone_id' : 'Asia/Irkutsk'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Irkutsk'
        }
      ],
      'irkt' :
      [
        {'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Irkutsk'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Irkutsk'
        }
      ],
      'irst' :
      [
        {'dst' : false,
          'offset' : 12600,
          'timezone_id' : 'Asia/Tehran'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Tehran'
        },{
          'dst' : false,
          'offset' : 12600,
          'timezone_id' : 'Iran'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Iran'
        }
      ],
      'isst' :
      [
        {'dst' : true,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Reykjavik'
        },{
          'dst' : true,
          'offset' : 0,
          'timezone_id' : 'Iceland'
        }
      ],
      'ist' :
      [
        {'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Jerusalem'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Atlantic/Reykjavik'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Iceland'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Calcutta'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Colombo'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Dacca'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Dhaka'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Karachi'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Katmandu'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Thimbu'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Thimphu'
        },{
          'dst' : true,
          'offset' : 2079,
          'timezone_id' : 'Eire'
        },{
          'dst' : true,
          'offset' : 2079,
          'timezone_id' : 'Europe/Dublin'
        },{
          'dst' : true,
          'offset' : 23400,
          'timezone_id' : 'Asia/Calcutta'
        },{
          'dst' : true,
          'offset' : 23400,
          'timezone_id' : 'Asia/Colombo'
        },{
          'dst' : true,
          'offset' : 23400,
          'timezone_id' : 'Asia/Karachi'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Eire'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Dublin'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Eire'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Dublin'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Gaza'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Asia/Tel_Aviv'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Israel'
        }
      ],
      'javt' :
      [
        {'dst' : false,
          'offset' : 26400,
          'timezone_id' : 'Asia/Jakarta'
        }
      ],
      'jdt' :
      [
        {'dst' : true,
          'offset' : 36000,
          'timezone_id' : 'Asia/Tokyo'
        },{
          'dst' : true,
          'offset' : 36000,
          'timezone_id' : 'Japan'
        }
      ],
      'jst' :
      [
        {'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Tokyo'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Dili'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Jakarta'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Kuala_Lumpur'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Kuching'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Makassar'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Manila'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Pontianak'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Rangoon'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Sakhalin'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Singapore'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Ujung_Pandang'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Japan'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Pacific/Nauru'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Singapore'
        }
      ],
      'kart' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Karachi'
        }
      ],
      'kast' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Kashgar'
        },{
          'dst' : false,
          'offset' : 19800,
          'timezone_id' : 'Asia/Kashgar'
        }
      ],
      'kdt' :
      [
        {'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Seoul'
        },{
          'dst' : true,
          'offset' : 36000,
          'timezone_id' : 'Asia/Seoul'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'ROK'
        },{
          'dst' : true,
          'offset' : 36000,
          'timezone_id' : 'ROK'
        }
      ],
      'kgst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Bishkek'
        }
      ],
      'kgt' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Bishkek'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Bishkek'
        }
      ],
      'kizst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Qyzylorda'
        }
      ],
      'kizt' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Qyzylorda'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Qyzylorda'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Qyzylorda'
        }
      ],
      'kmt' :
      [
        {'dst' : false,
          'offset' : 5736,
          'timezone_id' : 'Europe/Vilnius'
        }
      ],
      'kost' :
      [
        {'dst' : false,
          'offset' : 39600,
          'timezone_id' : 'Pacific/Kosrae'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Kosrae'
        }
      ],
      'krast' :
      [
        {'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Krasnoyarsk'
        },{
          'dst' : true,
          'offset' : 28800,
          'timezone_id' : 'Asia/Krasnoyarsk'
        }
      ],
      'krat' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Krasnoyarsk'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Krasnoyarsk'
        }
      ],
      'kst' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Seoul'
        },{
          'dst' : false,
          'offset' : 30600,
          'timezone_id' : 'Asia/Seoul'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Seoul'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Pyongyang'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'ROK'
        },{
          'dst' : false,
          'offset' : 30600,
          'timezone_id' : 'Asia/Pyongyang'
        },{
          'dst' : false,
          'offset' : 30600,
          'timezone_id' : 'ROK'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Pyongyang'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'ROK'
        }
      ],
      'kuyst' :
      [
        {'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Europe/Samara'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Samara'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Europe/Samara'
        }
      ],
      'kuyt' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Samara'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Europe/Samara'
        }
      ],
      'kwat' :
      [
        {'dst' : false,
          'offset' : -43200,
          'timezone_id' : 'Pacific/Kwajalein'
        },{
          'dst' : false,
          'offset' : -43200,
          'timezone_id' : 'Kwajalein'
        }
      ],
      'lhst' :
      [
        {'dst' : false,
          'offset' : 37800,
          'timezone_id' : 'Australia/Lord_Howe'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/Lord_Howe'
        },{
          'dst' : true,
          'offset' : 41400,
          'timezone_id' : 'Australia/Lord_Howe'
        },{
          'dst' : false,
          'offset' : 37800,
          'timezone_id' : 'Australia/LHI'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Australia/LHI'
        },{
          'dst' : true,
          'offset' : 41400,
          'timezone_id' : 'Australia/LHI'
        }
      ],
      'lint' :
      [
        {'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'Pacific/Kiritimati'
        },{
          'dst' : false,
          'offset' : 50400,
          'timezone_id' : 'Pacific/Kiritimati'
        }
      ],
      'lkt' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Colombo'
        },{
          'dst' : false,
          'offset' : 23400,
          'timezone_id' : 'Asia/Colombo'
        }
      ],
      'lont' :
      [
        {'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Chongqing'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Chungking'
        }
      ],
      'lrt' :
      [
        {'dst' : false,
          'offset' : -2670,
          'timezone_id' : 'Africa/Monrovia'
        }
      ],
      'lst' :
      [
        {'dst' : true,
          'offset' : 9384,
          'timezone_id' : 'Europe/Riga'
        }
      ],
      'madmt' :
      [
        {'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Atlantic/Madeira'
        }
      ],
      'madst' :
      [
        {'dst' : true,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Madeira'
        }
      ],
      'madt' :
      [
        {'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Atlantic/Madeira'
        }
      ],
      'magst' :
      [
        {'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Asia/Magadan'
        },{
          'dst' : true,
          'offset' : 43200,
          'timezone_id' : 'Asia/Magadan'
        }
      ],
      'magt' :
      [
        {'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Asia/Magadan'
        },{
          'dst' : false,
          'offset' : 39600,
          'timezone_id' : 'Asia/Magadan'
        }
      ],
      'malst' :
      [
        {'dst' : true,
          'offset' : 26400,
          'timezone_id' : 'Asia/Singapore'
        },{
          'dst' : true,
          'offset' : 26400,
          'timezone_id' : 'Asia/Kuala_Lumpur'
        },{
          'dst' : true,
          'offset' : 26400,
          'timezone_id' : 'Singapore'
        }
      ],
      'malt' :
      [
        {'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Singapore'
        },{
          'dst' : false,
          'offset' : 26400,
          'timezone_id' : 'Asia/Singapore'
        },{
          'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Asia/Singapore'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Kuala_Lumpur'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Singapore'
        },{
          'dst' : false,
          'offset' : 26400,
          'timezone_id' : 'Asia/Kuala_Lumpur'
        },{
          'dst' : false,
          'offset' : 26400,
          'timezone_id' : 'Singapore'
        },{
          'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Asia/Kuala_Lumpur'
        },{
          'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Singapore'
        }
      ],
      'mart' :
      [
        {'dst' : false,
          'offset' : -34200,
          'timezone_id' : 'Pacific/Marquesas'
        }
      ],
      'mawt' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Antarctica/Mawson'
        }
      ],
      'mddt' :
      [
        {'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Cambridge_Bay'
        },{
          'dst' : true,
          'offset' : -18000,
          'timezone_id' : 'America/Yellowknife'
        }
      ],
      'mdst' :
      [
        {'dst' : true,
          'offset' : 16248,
          'timezone_id' : 'Europe/Moscow'
        },{
          'dst' : true,
          'offset' : 16248,
          'timezone_id' : 'W-SU'
        }
      ],
      'mdt' :
      [
        {'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Denver'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Boise'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Cambridge_Bay'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Chihuahua'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Edmonton'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Hermosillo'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Inuvik'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Mazatlan'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/North_Dakota/Center'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/North_Dakota/New_Salem'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Phoenix'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Regina'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Shiprock'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Swift_Current'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Yellowknife'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/East-Saskatchewan'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/Mountain'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/Saskatchewan'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Mexico/BajaSur'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'MST'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'MST7MDT'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Navajo'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'US/Arizona'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'US/Mountain'
        }
      ],
      'mest' :
      [
        {'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'MET'
        }
      ],
      'met' :
      [
        {'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'MET'
        }
      ],
      'mht' :
      [
        {'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Kwajalein'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Kwajalein'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Majuro'
        }
      ],
      'mmt' :
      [
        {'dst' : false,
          'offset' : 9048,
          'timezone_id' : 'Europe/Moscow'
        },{
          'dst' : false,
          'offset' : 23400,
          'timezone_id' : 'Asia/Rangoon'
        },{
          'dst' : false,
          'offset' : 28656,
          'timezone_id' : 'Asia/Makassar'
        },{
          'dst' : false,
          'offset' : 28656,
          'timezone_id' : 'Asia/Ujung_Pandang'
        },{
          'dst' : false,
          'offset' : 9048,
          'timezone_id' : 'W-SU'
        }
      ],
      'most' :
      [
        {'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Macao'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Macau'
        }
      ],
      'mot' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Macao'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Macau'
        }
      ],
      'mpt' :
      [
        {'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Denver'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Boise'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Cambridge_Bay'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Edmonton'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/North_Dakota/Center'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/North_Dakota/New_Salem'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Regina'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Shiprock'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Swift_Current'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Yellowknife'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/East-Saskatchewan'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/Mountain'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/Saskatchewan'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'MST'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'MST7MDT'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Navajo'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'US/Mountain'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Pacific/Saipan'
        }
      ],
      'msd' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Moscow'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Europe/Moscow'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Chisinau'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Kaliningrad'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Kiev'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Minsk'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Riga'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Simferopol'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Tallinn'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Tiraspol'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Uzhgorod'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Vilnius'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Zaporozhye'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'W-SU'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'W-SU'
        }
      ],
      'msk' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Moscow'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Chisinau'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Kaliningrad'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Kiev'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Minsk'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Riga'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Simferopol'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Tallinn'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Tiraspol'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Uzhgorod'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Vilnius'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Zaporozhye'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'W-SU'
        }
      ],
      'mst' :
      [
        {'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Denver'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Boise'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Cambridge_Bay'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Chihuahua'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Dawson_Creek'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Edmonton'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Ensenada'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Hermosillo'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Inuvik'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Mazatlan'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Mexico_City'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/North_Dakota/Center'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/North_Dakota/New_Salem'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Phoenix'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Regina'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Shiprock'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Swift_Current'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Tijuana'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'America/Yellowknife'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Canada/East-Saskatchewan'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Canada/Mountain'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Canada/Saskatchewan'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Mexico/BajaNorte'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Mexico/BajaSur'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Mexico/General'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'MST'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'MST7MDT'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'Navajo'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'US/Arizona'
        },{
          'dst' : false,
          'offset' : -25200,
          'timezone_id' : 'US/Mountain'
        },{
          'dst' : true,
          'offset' : 12648,
          'timezone_id' : 'Europe/Moscow'
        },{
          'dst' : true,
          'offset' : 12648,
          'timezone_id' : 'W-SU'
        }
      ],
      'mut' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Indian/Mauritius'
        }
      ],
      'mvt' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Indian/Maldives'
        }
      ],
      'mwt' :
      [
        {'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Denver'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Boise'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Cambridge_Bay'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Edmonton'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/North_Dakota/Center'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/North_Dakota/New_Salem'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Phoenix'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Regina'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Shiprock'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Swift_Current'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Yellowknife'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/East-Saskatchewan'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/Mountain'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Canada/Saskatchewan'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'MST'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'MST7MDT'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'Navajo'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'US/Arizona'
        },{
          'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'US/Mountain'
        }
      ],
      'myt' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Kuala_Lumpur'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Kuching'
        }
      ],
      'ncst' :
      [
        {'dst' : true,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Noumea'
        }
      ],
      'nct' :
      [
        {'dst' : false,
          'offset' : 39600,
          'timezone_id' : 'Pacific/Noumea'
        }
      ],
      'nddt' :
      [
        {'dst' : true,
          'offset' : -5400,
          'timezone_id' : 'America/St_Johns'
        },{
          'dst' : true,
          'offset' : -5400,
          'timezone_id' : 'Canada/Newfoundland'
        }
      ],
      'ndt' :
      [
        {'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'America/St_Johns'
        },{
          'dst' : true,
          'offset' : -9052,
          'timezone_id' : 'America/St_Johns'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'Pacific/Midway'
        },{
          'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'Canada/Newfoundland'
        },{
          'dst' : true,
          'offset' : -9052,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : true,
          'offset' : -9052,
          'timezone_id' : 'Canada/Newfoundland'
        }
      ],
      'negt' :
      [
        {'dst' : false,
          'offset' : -12600,
          'timezone_id' : 'America/Paramaribo'
        }
      ],
      'nest' :
      [
        {'dst' : true,
          'offset' : 4800,
          'timezone_id' : 'Europe/Amsterdam'
        }
      ],
      'net' :
      [
        {'dst' : false,
          'offset' : 1200,
          'timezone_id' : 'Europe/Amsterdam'
        }
      ],
      'nft' :
      [
        {'dst' : false,
          'offset' : 41400,
          'timezone_id' : 'Pacific/Norfolk'
        }
      ],
      'novst' :
      [
        {'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Novosibirsk'
        },{
          'dst' : true,
          'offset' : 28800,
          'timezone_id' : 'Asia/Novosibirsk'
        }
      ],
      'novt' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Novosibirsk'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Novosibirsk'
        }
      ],
      'npt' :
      [
        {'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'America/St_Johns'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Adak'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Atka'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Nome'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'US/Aleutian'
        },{
          'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'Canada/Newfoundland'
        },{
          'dst' : false,
          'offset' : 20700,
          'timezone_id' : 'Asia/Katmandu'
        }
      ],
      'nrt' :
      [
        {'dst' : false,
          'offset' : 41400,
          'timezone_id' : 'Pacific/Nauru'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Nauru'
        }
      ],
      'nst' :
      [
        {'dst' : false,
          'offset' : -12600,
          'timezone_id' : 'America/St_Johns'
        },{
          'dst' : false,
          'offset' : -12652,
          'timezone_id' : 'America/St_Johns'
        },{
          'dst' : false,
          'offset' : -12600,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : false,
          'offset' : -12600,
          'timezone_id' : 'Canada/Newfoundland'
        },{
          'dst' : false,
          'offset' : -12652,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : false,
          'offset' : -12652,
          'timezone_id' : 'Canada/Newfoundland'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'America/Adak'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'America/Atka'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'America/Nome'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Midway'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Pago_Pago'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Samoa'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'US/Aleutian'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'US/Samoa'
        },{
          'dst' : true,
          'offset' : 4772,
          'timezone_id' : 'Europe/Amsterdam'
        }
      ],
      'nut' :
      [
        {'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Niue'
        },{
          'dst' : false,
          'offset' : -41400,
          'timezone_id' : 'Pacific/Niue'
        }
      ],
      'nwt' :
      [
        {'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'America/St_Johns'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Adak'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Atka'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'America/Nome'
        },{
          'dst' : true,
          'offset' : -36000,
          'timezone_id' : 'US/Aleutian'
        },{
          'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'America/Goose_Bay'
        },{
          'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'Canada/Newfoundland'
        }
      ],
      'nzdt' :
      [
        {'dst' : true,
          'offset' : 46800,
          'timezone_id' : 'Pacific/Auckland'
        },{
          'dst' : true,
          'offset' : 46800,
          'timezone_id' : 'Antarctica/McMurdo'
        },{
          'dst' : true,
          'offset' : 46800,
          'timezone_id' : 'Antarctica/South_Pole'
        },{
          'dst' : true,
          'offset' : 46800,
          'timezone_id' : 'NZ'
        }
      ],
      'nzmt' :
      [
        {'dst' : false,
          'offset' : 41400,
          'timezone_id' : 'Pacific/Auckland'
        },{
          'dst' : false,
          'offset' : 41400,
          'timezone_id' : 'NZ'
        }
      ],
      'nzst' :
      [
        {'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Auckland'
        },{
          'dst' : true,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Auckland'
        },{
          'dst' : true,
          'offset' : 45000,
          'timezone_id' : 'Pacific/Auckland'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Antarctica/McMurdo'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Antarctica/South_Pole'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'NZ'
        },{
          'dst' : true,
          'offset' : 43200,
          'timezone_id' : 'NZ'
        },{
          'dst' : true,
          'offset' : 45000,
          'timezone_id' : 'NZ'
        }
      ],
      'omsst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Omsk'
        },{
          'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Omsk'
        }
      ],
      'omst' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Omsk'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Omsk'
        }
      ],
      'orast' :
      [
        {'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Oral'
        }
      ],
      'orat' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Oral'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Oral'
        }
      ],
      'pddt' :
      [
        {'dst' : true,
          'offset' : -21600,
          'timezone_id' : 'America/Inuvik'
        }
      ],
      'pdt' :
      [
        {'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Los_Angeles'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Boise'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Dawson'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Dawson_Creek'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Ensenada'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Inuvik'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Juneau'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Tijuana'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Vancouver'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Whitehorse'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'Canada/Pacific'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'Canada/Yukon'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'Mexico/BajaNorte'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'PST8PDT'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'US/Pacific'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'US/Pacific-New'
        }
      ],
      'pest' :
      [
        {'dst' : true,
          'offset' : -14400,
          'timezone_id' : 'America/Lima'
        }
      ],
      'petst' :
      [
        {'dst' : true,
          'offset' : 43200,
          'timezone_id' : 'Asia/Kamchatka'
        },{
          'dst' : true,
          'offset' : 46800,
          'timezone_id' : 'Asia/Kamchatka'
        }
      ],
      'pett' :
      [
        {'dst' : false,
          'offset' : 39600,
          'timezone_id' : 'Asia/Kamchatka'
        },{
          'dst' : false,
          'offset' : 43200,
          'timezone_id' : 'Asia/Kamchatka'
        }
      ],
      'pet' :
      [
        {'dst' : false,
          'offset' : -18000,
          'timezone_id' : 'America/Lima'
        }
      ],
      'phot' :
      [
        {'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Enderbury'
        },{
          'dst' : false,
          'offset' : 46800,
          'timezone_id' : 'Pacific/Enderbury'
        }
      ],
      'phst' :
      [
        {'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Manila'
        }
      ],
      'pht' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Manila'
        }
      ],
      'pkst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Karachi'
        }
      ],
      'pkt' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Karachi'
        }
      ],
      'pmdt' :
      [
        {'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Miquelon'
        }
      ],
      'pmst' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Miquelon'
        }
      ],
      'pmt' :
      [
        {'dst' : false,
          'offset' : -13236,
          'timezone_id' : 'America/Paramaribo'
        },{
          'dst' : false,
          'offset' : -13252,
          'timezone_id' : 'America/Paramaribo'
        },{
          'dst' : false,
          'offset' : 26240,
          'timezone_id' : 'Asia/Pontianak'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Antarctica/DumontDUrville'
        }
      ],
      'ppt' :
      [
        {'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Los_Angeles'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Dawson_Creek'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Ensenada'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Inuvik'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Juneau'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Tijuana'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Vancouver'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'Canada/Pacific'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'Mexico/BajaNorte'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'PST8PDT'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'US/Pacific'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'US/Pacific-New'
        }
      ],
      'pst' :
      [
        {'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Los_Angeles'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Boise'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Dawson'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Dawson_Creek'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Ensenada'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Hermosillo'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Inuvik'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Juneau'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Mazatlan'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Tijuana'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Vancouver'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'America/Whitehorse'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'Canada/Pacific'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'Canada/Yukon'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'Mexico/BajaNorte'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'Mexico/BajaSur'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'Pacific/Pitcairn'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'PST8PDT'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'US/Pacific'
        },{
          'dst' : false,
          'offset' : -28800,
          'timezone_id' : 'US/Pacific-New'
        }
      ],
      'pwt' :
      [
        {'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Los_Angeles'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Dawson_Creek'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Ensenada'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Inuvik'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Juneau'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Tijuana'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Vancouver'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'Canada/Pacific'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'Mexico/BajaNorte'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'PST8PDT'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'US/Pacific'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'US/Pacific-New'
        }
      ],
      'pyst' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Asuncion'
        }
      ],
      'pyt' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Asuncion'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Asuncion'
        }
      ],
      'qyzst' :
      [
        {'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Qyzylorda'
        }
      ],
      'qyzt' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Qyzylorda'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Qyzylorda'
        }
      ],
      'ret' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Indian/Reunion'
        }
      ],
      'rmt' :
      [
        {'dst' : false,
          'offset' : 5784,
          'timezone_id' : 'Europe/Riga'
        }
      ],
      'rott' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'Antarctica/Rothera'
        }
      ],
      'sakst' :
      [
        {'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Asia/Sakhalin'
        },{
          'dst' : true,
          'offset' : 43200,
          'timezone_id' : 'Asia/Sakhalin'
        }
      ],
      'sakt' :
      [
        {'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Asia/Sakhalin'
        },{
          'dst' : false,
          'offset' : 39600,
          'timezone_id' : 'Asia/Sakhalin'
        }
      ],
      'samst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Samarkand'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Europe/Samara'
        }
      ],
      'samt' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Samarkand'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Samarkand'
        },{
          'dst' : false,
          'offset' : -41400,
          'timezone_id' : 'Pacific/Apia'
        },{
          'dst' : false,
          'offset' : -41400,
          'timezone_id' : 'Pacific/Pago_Pago'
        },{
          'dst' : false,
          'offset' : -41400,
          'timezone_id' : 'Pacific/Samoa'
        },{
          'dst' : false,
          'offset' : -41400,
          'timezone_id' : 'US/Samoa'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Samara'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Europe/Samara'
        }
      ],
      'sast' :
      [
        {'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Africa/Johannesburg'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Johannesburg'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Africa/Maseru'
        },{
          'dst' : true,
          'offset' : 10800,
          'timezone_id' : 'Africa/Windhoek'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Maseru'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Mbabane'
        },{
          'dst' : false,
          'offset' : 7200,
          'timezone_id' : 'Africa/Windhoek'
        }
      ],
      'sbt' :
      [
        {'dst' : false,
          'offset' : 39600,
          'timezone_id' : 'Pacific/Guadalcanal'
        }
      ],
      'sct' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Indian/Mahe'
        }
      ],
      'sgt' :
      [
        {'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Asia/Singapore'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Singapore'
        },{
          'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Singapore'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Singapore'
        }
      ],
      'shest' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Aqtau'
        }
      ],
      'shet' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Aqtau'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Aqtau'
        }
      ],
      'slst' :
      [
        {'dst' : true,
          'offset' : -1200,
          'timezone_id' : 'Africa/Freetown'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Africa/Freetown'
        }
      ],
      'smt' :
      [
        {'dst' : false,
          'offset' : 25580,
          'timezone_id' : 'Asia/Saigon'
        },{
          'dst' : false,
          'offset' : -16966,
          'timezone_id' : 'America/Santiago'
        },{
          'dst' : false,
          'offset' : -16966,
          'timezone_id' : 'Chile/Continental'
        },{
          'dst' : false,
          'offset' : 25580,
          'timezone_id' : 'Asia/Phnom_Penh'
        },{
          'dst' : false,
          'offset' : 25580,
          'timezone_id' : 'Asia/Vientiane'
        }
      ],
      'srt' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Paramaribo'
        },{
          'dst' : false,
          'offset' : -12600,
          'timezone_id' : 'America/Paramaribo'
        }
      ],
      'sst' :
      [
        {'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Samoa'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Midway'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Pago_Pago'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'US/Samoa'
        }
      ],
      'stat' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Volgograd'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Europe/Volgograd'
        }
      ],
      'svest' :
      [
        {'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Yekaterinburg'
        },{
          'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Yekaterinburg'
        }
      ],
      'svet' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Yekaterinburg'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Yekaterinburg'
        }
      ],
      'syot' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Antarctica/Syowa'
        }
      ],
      'taht' :
      [
        {'dst' : false,
          'offset' : -36000,
          'timezone_id' : 'Pacific/Tahiti'
        }
      ],
      'tasst' :
      [
        {'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Samarkand'
        },{
          'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Tashkent'
        },{
          'dst' : true,
          'offset' : 25200,
          'timezone_id' : 'Asia/Tashkent'
        }
      ],
      'tast' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Samarkand'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Tashkent'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Tashkent'
        }
      ],
      'tbist' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Tbilisi'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Tbilisi'
        }
      ],
      'tbit' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Tbilisi'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Tbilisi'
        }
      ],
      'tft' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Indian/Kerguelen'
        }
      ],
      'tjt' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Dushanbe'
        }
      ],
      'tlt' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Dili'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Dili'
        }
      ],
      'tmt' :
      [
        {'dst' : false,
          'offset' : 12344,
          'timezone_id' : 'Asia/Tehran'
        },{
          'dst' : false,
          'offset' : 12344,
          'timezone_id' : 'Iran'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Ashgabat'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Ashkhabad'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Ashgabat'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Ashkhabad'
        },{
          'dst' : false,
          'offset' : 5940,
          'timezone_id' : 'Europe/Tallinn'
        }
      ],
      'tost' :
      [
        {'dst' : true,
          'offset' : 50400,
          'timezone_id' : 'Pacific/Tongatapu'
        }
      ],
      'tot' :
      [
        {'dst' : false,
          'offset' : 46800,
          'timezone_id' : 'Pacific/Tongatapu'
        }
      ],
      'trst' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Istanbul'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Istanbul'
        },{
          'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Turkey'
        }
      ],
      'trt' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Istanbul'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Istanbul'
        },{
          'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Turkey'
        }
      ],
      'tsat' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Volgograd'
        }
      ],
      'ulast' :
      [
        {'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Ulaanbaatar'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Ulan_Bator'
        }
      ],
      'ulat' :
      [
        {'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Ulaanbaatar'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Ulaanbaatar'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Choibalsan'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Ulan_Bator'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Choibalsan'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Ulan_Bator'
        }
      ],
      'urast' :
      [
        {'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Oral'
        },{
          'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Oral'
        }
      ],
      'urat' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Oral'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Oral'
        },{
          'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Oral'
        }
      ],
      'urut' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Asia/Urumqi'
        }
      ],
      'uyhst' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Montevideo'
        },{
          'dst' : true,
          'offset' : -9000,
          'timezone_id' : 'America/Montevideo'
        }
      ],
      'uyst' :
      [
        {'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Montevideo'
        }
      ],
      'uyt' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Montevideo'
        },{
          'dst' : false,
          'offset' : -12600,
          'timezone_id' : 'America/Montevideo'
        }
      ],
      'uzst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Samarkand'
        },{
          'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Tashkent'
        }
      ],
      'uzt' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Samarkand'
        },{
          'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Tashkent'
        }
      ],
      'vet' :
      [
        {'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Caracas'
        },{
          'dst' : false,
          'offset' : -16200,
          'timezone_id' : 'America/Caracas'
        }
      ],
      'vlasst' :
      [
        {'dst' : true,
          'offset' : 36000,
          'timezone_id' : 'Asia/Vladivostok'
        }
      ],
      'vlast' :
      [
        {'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Vladivostok'
        },{
          'dst' : true,
          'offset' : 39600,
          'timezone_id' : 'Asia/Vladivostok'
        }
      ],
      'vlat' :
      [
        {'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Vladivostok'
        },{
          'dst' : false,
          'offset' : 36000,
          'timezone_id' : 'Asia/Vladivostok'
        }
      ],
      'volst' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Europe/Volgograd'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Europe/Volgograd'
        }
      ],
      'volt' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Europe/Volgograd'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Europe/Volgograd'
        }
      ],
      'vost' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : 'Antarctica/Vostok'
        }
      ],
      'vust' :
      [
        {'dst' : true,
          'offset' : 43200,
          'timezone_id' : 'Pacific/Efate'
        }
      ],
      'vut' :
      [
        {'dst' : false,
          'offset' : 39600,
          'timezone_id' : 'Pacific/Efate'
        }
      ],
      'warst' :
      [
        {'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Mendoza'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Jujuy'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Argentina/Mendoza'
        },{
          'dst' : true,
          'offset' : -10800,
          'timezone_id' : 'America/Jujuy'
        }
      ],
      'wart' :
      [
        {'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Mendoza'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Catamarca'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/ComodRivadavia'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Cordoba'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Jujuy'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/La_Rioja'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Mendoza'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Rio_Gallegos'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/San_Juan'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Tucuman'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Argentina/Ushuaia'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Catamarca'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Cordoba'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Jujuy'
        },{
          'dst' : false,
          'offset' : -14400,
          'timezone_id' : 'America/Rosario'
        }
      ],
      'wast' :
      [
        {'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Africa/Windhoek'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Africa/Ndjamena'
        }
      ],
      'wat' :
      [
        {'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Dakar'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Bamako'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Banjul'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Bissau'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Conakry'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/El_Aaiun'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Freetown'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Niamey'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Nouakchott'
        },{
          'dst' : false,
          'offset' : -3600,
          'timezone_id' : 'Africa/Timbuktu'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Freetown'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Brazzaville'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Bangui'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Douala'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Lagos'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Libreville'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Luanda'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Malabo'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Ndjamena'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Niamey'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Porto-Novo'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Africa/Windhoek'
        }
      ],
      'wemt' :
      [
        {'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Lisbon'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Madrid'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Monaco'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Paris'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Portugal'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'WET'
        }
      ],
      'west' :
      [
        {'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Paris'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Africa/Algiers'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Africa/Casablanca'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Africa/Ceuta'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Atlantic/Canary'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Atlantic/Faeroe'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Atlantic/Faroe'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Atlantic/Madeira'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Brussels'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Lisbon'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Luxembourg'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Madrid'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Europe/Monaco'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'Portugal'
        },{
          'dst' : true,
          'offset' : 3600,
          'timezone_id' : 'WET'
        },{
          'dst' : true,
          'offset' : 7200,
          'timezone_id' : 'Europe/Luxembourg'
        }
      ],
      'wet' :
      [
        {'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Paris'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Algiers'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Casablanca'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/Ceuta'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Africa/El_Aaiun'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Azores'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Canary'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Faeroe'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Faroe'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Atlantic/Madeira'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Brussels'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Lisbon'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Luxembourg'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Madrid'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Europe/Monaco'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Portugal'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'WET'
        },{
          'dst' : false,
          'offset' : 3600,
          'timezone_id' : 'Europe/Luxembourg'
        }
      ],
      'wgst' :
      [
        {'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Godthab'
        },{
          'dst' : true,
          'offset' : -7200,
          'timezone_id' : 'America/Danmarkshavn'
        }
      ],
      'wgt' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Godthab'
        },{
          'dst' : false,
          'offset' : -10800,
          'timezone_id' : 'America/Danmarkshavn'
        }
      ],
      'wit' :
      [
        {'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Jakarta'
        },{
          'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Asia/Jakarta'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Jakarta'
        },{
          'dst' : false,
          'offset' : 25200,
          'timezone_id' : 'Asia/Pontianak'
        },{
          'dst' : false,
          'offset' : 27000,
          'timezone_id' : 'Asia/Pontianak'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Pontianak'
        }
      ],
      'wst' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Australia/Perth'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Australia/Perth'
        },{
          'dst' : false,
          'offset' : -39600,
          'timezone_id' : 'Pacific/Apia'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Antarctica/Casey'
        },{
          'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Australia/West'
        },{
          'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Australia/West'
        }
      ],
      'yakst' :
      [
        {'dst' : true,
          'offset' : 32400,
          'timezone_id' : 'Asia/Yakutsk'
        },{
          'dst' : true,
          'offset' : 36000,
          'timezone_id' : 'Asia/Yakutsk'
        }
      ],
      'yakt' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : 'Asia/Yakutsk'
        },{
          'dst' : false,
          'offset' : 32400,
          'timezone_id' : 'Asia/Yakutsk'
        }
      ],
      'yddt' :
      [
        {'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Dawson'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'America/Whitehorse'
        },{
          'dst' : true,
          'offset' : -25200,
          'timezone_id' : 'Canada/Yukon'
        }
      ],
      'ydt' :
      [
        {'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Dawson'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Whitehorse'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Yakutat'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'Canada/Yukon'
        }
      ],
      'yekst' :
      [
        {'dst' : true,
          'offset' : 21600,
          'timezone_id' : 'Asia/Yekaterinburg'
        }
      ],
      'yekt' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : 'Asia/Yekaterinburg'
        }
      ],
      'yerst' :
      [
        {'dst' : true,
          'offset' : 14400,
          'timezone_id' : 'Asia/Yerevan'
        },{
          'dst' : true,
          'offset' : 18000,
          'timezone_id' : 'Asia/Yerevan'
        }
      ],
      'yert' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : 'Asia/Yerevan'
        },{
          'dst' : false,
          'offset' : 14400,
          'timezone_id' : 'Asia/Yerevan'
        }
      ],
      'ypt' :
      [
        {'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Dawson'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Whitehorse'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Yakutat'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'Canada/Yukon'
        }
      ],
      'yst' :
      [
        {'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Anchorage'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Dawson'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Juneau'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Nome'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Whitehorse'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'America/Yakutat'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'Canada/Yukon'
        },{
          'dst' : false,
          'offset' : -32400,
          'timezone_id' : 'US/Alaska'
        }
      ],
      'ywt' :
      [
        {'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Dawson'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Whitehorse'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'America/Yakutat'
        },{
          'dst' : true,
          'offset' : -28800,
          'timezone_id' : 'Canada/Yukon'
        }
      ],
      'a' :
      [
        {'dst' : false,
          'offset' : 3600,
          'timezone_id' : null
        }
      ],
      'b' :
      [
        {'dst' : false,
          'offset' : 7200,
          'timezone_id' : null
        }
      ],
      'c' :
      [
        {'dst' : false,
          'offset' : 10800,
          'timezone_id' : null
        }
      ],
      'd' :
      [
        {'dst' : false,
          'offset' : 14400,
          'timezone_id' : null
        }
      ],
      'e' :
      [
        {'dst' : false,
          'offset' : 18000,
          'timezone_id' : null
        }
      ],
      'f' :
      [
        {'dst' : false,
          'offset' : 21600,
          'timezone_id' : null
        }
      ],
      'g' :
      [
        {'dst' : false,
          'offset' : 25200,
          'timezone_id' : null
        }
      ],
      'h' :
      [
        {'dst' : false,
          'offset' : 28800,
          'timezone_id' : null
        }
      ],
      'i' :
      [
        {'dst' : false,
          'offset' : 32400,
          'timezone_id' : null
        }
      ],
      'k' :
      [
        {'dst' : false,
          'offset' : 36000,
          'timezone_id' : null
        }
      ],
      'l' :
      [
        {'dst' : false,
          'offset' : 39600,
          'timezone_id' : null
        }
      ],
      'm' :
      [
        {'dst' : false,
          'offset' : 43200,
          'timezone_id' : null
        }
      ],
      'n' :
      [
        {'dst' : false,
          'offset' : -3600,
          'timezone_id' : null
        }
      ],
      'o' :
      [
        {'dst' : false,
          'offset' : -7200,
          'timezone_id' : null
        }
      ],
      'p' :
      [
        {'dst' : false,
          'offset' : -10800,
          'timezone_id' : null
        }
      ],
      'q' :
      [
        {'dst' : false,
          'offset' : -14400,
          'timezone_id' : null
        }
      ],
      'r' :
      [
        {'dst' : false,
          'offset' : -18000,
          'timezone_id' : null
        }
      ],
      's' :
      [
        {'dst' : false,
          'offset' : -21600,
          'timezone_id' : null
        }
      ],
      't' :
      [
        {'dst' : false,
          'offset' : -25200,
          'timezone_id' : null
        }
      ],
      'utc' :
      [
        {'dst' : false,
          'offset' : 0,
          'timezone_id' : 'UTC'
        }
      ],
      'u' :
      [
        {'dst' : false,
          'offset' : -28800,
          'timezone_id' : null
        }
      ],
      'v' :
      [
        {'dst' : false,
          'offset' : -32400,
          'timezone_id' : null
        }
      ],
      'w' :
      [
        {'dst' : false,
          'offset' : -36000,
          'timezone_id' : null
        }
      ],
      'x' :
      [
        {'dst' : false,
          'offset' : -39600,
          'timezone_id' : null
        }
      ],
      'y' :
      [
        {'dst' : false,
          'offset' : -43200,
          'timezone_id' : null
        }
      ],
      'zzz' :
      [
        {'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Antarctica/Davis'
        },{
          'dst' : false,
          'offset' : 0,
          'timezone_id' : 'Antarctica/DumontDUrville'
        }
      ],
      'z' :
      [
        {'dst' : false,
          'offset' : 0,
          'timezone_id' : null
        }
      ]
    };

    return timezone_abbreviations;
}