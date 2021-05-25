export interface ICountryInfoRow {
  countryName: string;
  ISO2: string;
  phoneCode: string | number;
  phoneMask?: string;
  sortOrder?: number;
}

export const countryInfoByISO = (code: string): ICountryInfoRow => {
  code = code.trim().toLowerCase();

  let res = countriesInfo.find(row => row.ISO2.toLowerCase() === code);
  if (!res) {
    console.error(`Unknown country code "${code}". Using US code by default.`);

    return countryInfoByISO('US');
  }

  return res;
}

export const countryInfoByPhoneCode = (code: number | string): ICountryInfoRow => {
  code = code.toString().trim().toLowerCase();

  let res = countriesInfo.find(row => row.phoneCode.toString().toLowerCase() === code);
  if (!res) {
    console.error(`Unknown phone code "${code}". Using US code by default.`);

    return countryInfoByPhoneCode(1);
  }

  return res;
}


export const countriesInfo: ICountryInfoRow[] = [
  {
    countryName: 'Afghanistan',
    ISO2: 'AF',
    phoneCode: 93,
  },
  {
    countryName: 'Albania',
    ISO2: 'AL',
    phoneCode: 355,
  },
  {
    countryName: 'Algeria',
    ISO2: 'DZ',
    phoneCode: 213,
  },
  {
    countryName: 'American Samoa',
    ISO2: 'AS',
    phoneCode: '1-684',
  },
  {
    countryName: 'Andorra',
    ISO2: 'AD',
    phoneCode: 376,
  },
  {
    countryName: 'Angola',
    ISO2: 'AO',
    phoneCode: 244,
  },
  {
    countryName: 'Anguilla',
    ISO2: 'AI',
    phoneCode: '1-264',
  },
  {
    countryName: 'Antarctica',
    ISO2: 'AQ',
    phoneCode: 672,
  },
  {
    countryName: 'Antigua and Barbuda',
    ISO2: 'AG',
    phoneCode: '1-268',
  },
  {
    countryName: 'Argentina',
    ISO2: 'AR',
    phoneCode: 54,
  },
  {
    countryName: 'Armenia',
    ISO2: 'AM',
    phoneCode: 374,
  },
  {
    countryName: 'Aruba',
    ISO2: 'AW',
    phoneCode: 297,
  },
  {
    countryName: 'Australia',
    ISO2: 'AU',
    phoneCode: 61,
    phoneMask: '\\d\\d\\d\\d \\d\\d\\d \\d\\d\\d',
    sortOrder: 3
  },
  {
    countryName: 'Austria',
    ISO2: 'AT',
    phoneCode: 43,
    sortOrder: 15
  },
  {
    countryName: 'Azerbaijan',
    ISO2: 'AZ',
    phoneCode: 994,
  },
  {
    countryName: 'Bahamas',
    ISO2: 'BS',
    phoneCode: '1-242',
  },
  {
    countryName: 'Bahrain',
    ISO2: 'BH',
    phoneCode: 973,
    sortOrder: 14
  },
  {
    countryName: 'Bangladesh',
    ISO2: 'BD',
    phoneCode: 880,
  },
  {
    countryName: 'Barbados',
    ISO2: 'BB',
    phoneCode: '1-246',
  },
  {
    countryName: 'Belarus',
    ISO2: 'BY',
    phoneCode: 375,
  },
  {
    countryName: 'Belgium',
    ISO2: 'BE',
    phoneCode: 32,
  },
  {
    countryName: 'Belize',
    ISO2: 'BZ',
    phoneCode: 501,
  },
  {
    countryName: 'Benin',
    ISO2: 'BJ',
    phoneCode: 229,
  },
  {
    countryName: 'Bermuda',
    ISO2: 'BM',
    phoneCode: '1-441',
  },
  {
    countryName: 'Bhutan',
    ISO2: 'BT',
    phoneCode: 975,
  },
  {
    countryName: 'Bolivia',
    ISO2: 'BO',
    phoneCode: 591,
  },
  {
    countryName: 'Bosnia and Herzegovina',
    ISO2: 'BA',
    phoneCode: 387,
  },
  {
    countryName: 'Botswana',
    ISO2: 'BW',
    phoneCode: 267,
  },
  {
    countryName: 'Brazil',
    ISO2: 'BR',
    phoneCode: 55,
  },
  {
    countryName: 'British Indian Ocean Territory',
    ISO2: 'IO',
    phoneCode: 246,
  },
  {
    countryName: 'British Virgin Islands',
    ISO2: 'VG',
    phoneCode: '1-284',
  },
  {
    countryName: 'Brunei',
    ISO2: 'BN',
    phoneCode: 673,
  },
  {
    countryName: 'Bulgaria',
    ISO2: 'BG',
    phoneCode: 359,
  },
  {
    countryName: 'Burkina Faso',
    ISO2: 'BF',
    phoneCode: 226,
  },
  {
    countryName: 'Burundi',
    ISO2: 'BI',
    phoneCode: 257,
  },
  {
    countryName: 'Cambodia',
    ISO2: 'KH',
    phoneCode: 855,
  },
  {
    countryName: 'Cameroon',
    ISO2: 'CM',
    phoneCode: 237,
  },
  {
    countryName: 'Canada',
    ISO2: 'CA',
    phoneCode: 1,
    phoneMask: '\\d\\d\\d-\\d\\d\\d-\\d\\d\\d\\d',
    sortOrder: 2
  },
  {
    countryName: 'Cape Verde',
    ISO2: 'CV',
    phoneCode: 238,
  },
  {
    countryName: 'Cayman Islands',
    ISO2: 'KY',
    phoneCode: '1-345',
  },
  {
    countryName: 'Central African Republic',
    ISO2: 'CF',
    phoneCode: 236,
  },
  {
    countryName: 'Chad',
    ISO2: 'TD',
    phoneCode: 235,
  },
  {
    countryName: 'Chile',
    ISO2: 'CL',
    phoneCode: 56,
  },
  {
    countryName: 'China',
    ISO2: 'CN',
    phoneCode: 86,
  },
  {
    countryName: 'Christmas Island',
    ISO2: 'CX',
    phoneCode: 61,
  },
  {
    countryName: 'Cocos Islands',
    ISO2: 'CC',
    phoneCode: 61,
  },
  {
    countryName: 'Colombia',
    ISO2: 'CO',
    phoneCode: 57,
  },
  {
    countryName: 'Comoros',
    ISO2: 'KM',
    phoneCode: 269,
  },
  {
    countryName: 'Cook Islands',
    ISO2: 'CK',
    phoneCode: 682,
  },
  {
    countryName: 'Costa Rica',
    ISO2: 'CR',
    phoneCode: 506,
  },
  {
    countryName: 'Croatia',
    ISO2: 'HR',
    phoneCode: 385,
  },
  {
    countryName: 'Cuba',
    ISO2: 'CU',
    phoneCode: 53,
  },
  {
    countryName: 'Curacao',
    ISO2: 'CW',
    phoneCode: 599,
  },
  {
    countryName: 'Cyprus',
    ISO2: 'CY',
    phoneCode: 357,
  },
  {
    countryName: 'Czech Republic',
    ISO2: 'CZ',
    phoneCode: 420,
  },
  {
    countryName: 'Democratic Republic of the Congo',
    ISO2: 'CD',
    phoneCode: 243,
  },
  {
    countryName: 'Denmark',
    ISO2: 'DK',
    phoneCode: 45,
  },
  {
    countryName: 'Djibouti',
    ISO2: 'DJ',
    phoneCode: 253,
  },
  {
    countryName: 'Dominica',
    ISO2: 'DM',
    phoneCode: '1-767',
  },
  {
    countryName: 'Dominican Republic',
    ISO2: 'DO',
    phoneCode: '1-809, 1-829, 1-849',
  },
  {
    countryName: 'East Timor',
    ISO2: 'TL',
    phoneCode: 670,
  },
  {
    countryName: 'Ecuador',
    ISO2: 'EC',
    phoneCode: 593,
  },
  {
    countryName: 'Egypt',
    ISO2: 'EG',
    phoneCode: 20,
  },
  {
    countryName: 'El Salvador',
    ISO2: 'SV',
    phoneCode: 503,
  },
  {
    countryName: 'Equatorial Guinea',
    ISO2: 'GQ',
    phoneCode: 240,
  },
  {
    countryName: 'Eritrea',
    ISO2: 'ER',
    phoneCode: 291,
  },
  {
    countryName: 'Estonia',
    ISO2: 'EE',
    phoneCode: 372,
  },
  {
    countryName: 'Ethiopia',
    ISO2: 'ET',
    phoneCode: 251,
  },
  {
    countryName: 'Falkland Islands',
    ISO2: 'FK',
    phoneCode: 500,
  },
  {
    countryName: 'Faroe Islands',
    ISO2: 'FO',
    phoneCode: 298,
  },
  {
    countryName: 'Fiji',
    ISO2: 'FJ',
    phoneCode: 679,
  },
  {
    countryName: 'Finland',
    ISO2: 'FI',
    phoneCode: 358,
  },
  {
    countryName: 'France',
    ISO2: 'FR',
    phoneCode: 33,
  },
  {
    countryName: 'French Polynesia',
    ISO2: 'PF',
    phoneCode: 689,
  },
  {
    countryName: 'Gabon',
    ISO2: 'GA',
    phoneCode: 241,
  },
  {
    countryName: 'Gambia',
    ISO2: 'GM',
    phoneCode: 220,
  },
  {
    countryName: 'Georgia',
    ISO2: 'GE',
    phoneCode: 995,
  },
  {
    countryName: 'Germany',
    ISO2: 'DE',
    phoneCode: 49,
    phoneMask: '\\d\\d\\d\\d\\d-\\d\\d\\d\\d',
    sortOrder: 6
  },
  {
    countryName: 'Ghana',
    ISO2: 'GH',
    phoneCode: 233,
  },
  {
    countryName: 'Gibraltar',
    ISO2: 'GI',
    phoneCode: 350,
  },
  {
    countryName: 'Greece',
    ISO2: 'GR',
    phoneCode: 30,
  },
  {
    countryName: 'Greenland',
    ISO2: 'GL',
    phoneCode: 299,
  },
  {
    countryName: 'Grenada',
    ISO2: 'GD',
    phoneCode: '1-473',
  },
  {
    countryName: 'Guam',
    ISO2: 'GU',
    phoneCode: '1-671',
  },
  {
    countryName: 'Guatemala',
    ISO2: 'GT',
    phoneCode: 502,
  },
  {
    countryName: 'Guernsey',
    ISO2: 'GG',
    phoneCode: '44-1481',
  },
  {
    countryName: 'Guinea',
    ISO2: 'GN',
    phoneCode: 224,
  },
  {
    countryName: 'Guinea-Bissau',
    ISO2: 'GW',
    phoneCode: 245,
  },
  {
    countryName: 'Guyana',
    ISO2: 'GY',
    phoneCode: 592,
  },
  {
    countryName: 'Haiti',
    ISO2: 'HT',
    phoneCode: 509,
  },
  {
    countryName: 'Honduras',
    ISO2: 'HN',
    phoneCode: 504,
  },
  {
    countryName: 'Hong Kong',
    ISO2: 'HK',
    phoneCode: 852,
  },
  {
    countryName: 'Hungary',
    ISO2: 'HU',
    phoneCode: 36,
  },
  {
    countryName: 'Iceland',
    ISO2: 'IS',
    phoneCode: 354,
  },
  {
    countryName: 'India',
    ISO2: 'IN',
    phoneCode: 91,
  },
  {
    countryName: 'Indonesia',
    ISO2: 'ID',
    phoneCode: 62,
  },
  {
    countryName: 'Iran',
    ISO2: 'IR',
    phoneCode: 98,
  },
  {
    countryName: 'Iraq',
    ISO2: 'IQ',
    phoneCode: 964,
  },
  {
    countryName: 'Ireland',
    ISO2: 'IE',
    phoneCode: 353,
    sortOrder: 13
  },
  {
    countryName: 'Isle of Man',
    ISO2: 'IM',
    phoneCode: '44-1624',
  },
  {
    countryName: 'Israel',
    ISO2: 'IL',
    phoneCode: 972,
  },
  {
    countryName: 'Italy',
    ISO2: 'IT',
    phoneCode: 39,
  },
  {
    countryName: 'Ivory Coast',
    ISO2: 'CI',
    phoneCode: 225,
  },
  {
    countryName: 'Jamaica',
    ISO2: 'JM',
    phoneCode: '1-876',
  },
  {
    countryName: 'Japan',
    ISO2: 'JP',
    phoneCode: 81,
    phoneMask: '\\d\\d\\d\\d\\d-\\d\\d\\d\\d',
    sortOrder: 8
  },
  {
    countryName: 'Jersey',
    ISO2: 'JE',
    phoneCode: '44-1534',
  },
  {
    countryName: 'Jordan',
    ISO2: 'JO',
    phoneCode: 962,
  },
  {
    countryName: 'Kazakhstan',
    ISO2: 'KZ',
    phoneCode: 7,
  },
  {
    countryName: 'Kenya',
    ISO2: 'KE',
    phoneCode: 254,
  },
  {
    countryName: 'Kiribati',
    ISO2: 'KI',
    phoneCode: 686,
  },
  {
    countryName: 'Kosovo',
    ISO2: 'XK',
    phoneCode: 383,
  },
  {
    countryName: 'Kuwait',
    ISO2: 'KW',
    phoneCode: 965,
  },
  {
    countryName: 'Kyrgyzstan',
    ISO2: 'KG',
    phoneCode: 996,
  },
  {
    countryName: 'Laos',
    ISO2: 'LA',
    phoneCode: 856,
  },
  {
    countryName: 'Latvia',
    ISO2: 'LV',
    phoneCode: 371,
  },
  {
    countryName: 'Lebanon',
    ISO2: 'LB',
    phoneCode: 961,
  },
  {
    countryName: 'Lesotho',
    ISO2: 'LS',
    phoneCode: 266,
  },
  {
    countryName: 'Liberia',
    ISO2: 'LR',
    phoneCode: 231,
  },
  {
    countryName: 'Libya',
    ISO2: 'LY',
    phoneCode: 218,
  },
  {
    countryName: 'Liechtenstein',
    ISO2: 'LI',
    phoneCode: 423,
  },
  {
    countryName: 'Lithuania',
    ISO2: 'LT',
    phoneCode: 370,
  },
  {
    countryName: 'Luxembourg',
    ISO2: 'LU',
    phoneCode: 352,
  },
  {
    countryName: 'Macau',
    ISO2: 'MO',
    phoneCode: 853,
  },
  {
    countryName: 'Macedonia',
    ISO2: 'MK',
    phoneCode: 389,
  },
  {
    countryName: 'Madagascar',
    ISO2: 'MG',
    phoneCode: 261,
  },
  {
    countryName: 'Malawi',
    ISO2: 'MW',
    phoneCode: 265,
  },
  {
    countryName: 'Malaysia',
    ISO2: 'MY',
    phoneCode: 60,
  },
  {
    countryName: 'Maldives',
    ISO2: 'MV',
    phoneCode: 960,
  },
  {
    countryName: 'Mali',
    ISO2: 'ML',
    phoneCode: 223,
  },
  {
    countryName: 'Malta',
    ISO2: 'MT',
    phoneCode: 356,
  },
  {
    countryName: 'Marshall Islands',
    ISO2: 'MH',
    phoneCode: 692,
  },
  {
    countryName: 'Mauritania',
    ISO2: 'MR',
    phoneCode: 222,
  },
  {
    countryName: 'Mauritius',
    ISO2: 'MU',
    phoneCode: 230,
  },
  {
    countryName: 'Mayotte',
    ISO2: 'YT',
    phoneCode: 262,
  },
  {
    countryName: 'Mexico',
    ISO2: 'MX',
    phoneCode: 52,
    sortOrder: 11
  },
  {
    countryName: 'Micronesia',
    ISO2: 'FM',
    phoneCode: 691,
  },
  {
    countryName: 'Moldova',
    ISO2: 'MD',
    phoneCode: 373,
  },
  {
    countryName: 'Monaco',
    ISO2: 'MC',
    phoneCode: 377,
  },
  {
    countryName: 'Mongolia',
    ISO2: 'MN',
    phoneCode: 976,
  },
  {
    countryName: 'Montenegro',
    ISO2: 'ME',
    phoneCode: 382,
  },
  {
    countryName: 'Montserrat',
    ISO2: 'MS',
    phoneCode: '1-664',
  },
  {
    countryName: 'Morocco',
    ISO2: 'MA',
    phoneCode: 212,
  },
  {
    countryName: 'Mozambique',
    ISO2: 'MZ',
    phoneCode: 258,
  },
  {
    countryName: 'Myanmar',
    ISO2: 'MM',
    phoneCode: 95,
  },
  {
    countryName: 'Namibia',
    ISO2: 'NA',
    phoneCode: 264,
  },
  {
    countryName: 'Nauru',
    ISO2: 'NR',
    phoneCode: 674,
  },
  {
    countryName: 'Nepal',
    ISO2: 'NP',
    phoneCode: 977,
  },
  {
    countryName: 'Netherlands',
    ISO2: 'NL',
    phoneCode: 31,
  },
  {
    countryName: 'Netherlands Antilles',
    ISO2: 'AN',
    phoneCode: 599,
  },
  {
    countryName: 'New Caledonia',
    ISO2: 'NC',
    phoneCode: 687,
  },
  {
    countryName: 'New Zealand',
    ISO2: 'NZ',
    phoneCode: 64,
    sortOrder: 10
  },
  {
    countryName: 'Nicaragua',
    ISO2: 'NI',
    phoneCode: 505,
  },
  {
    countryName: 'Niger',
    ISO2: 'NE',
    phoneCode: 227,
  },
  {
    countryName: 'Nigeria',
    ISO2: 'NG',
    phoneCode: 234,
  },
  {
    countryName: 'Niue',
    ISO2: 'NU',
    phoneCode: 683,
  },
  {
    countryName: 'North Korea',
    ISO2: 'KP',
    phoneCode: 850,
  },
  {
    countryName: 'Northern Mariana Islands',
    ISO2: 'MP',
    phoneCode: '1-670',
  },
  {
    countryName: 'Norway',
    ISO2: 'NO',
    phoneCode: 47,
    sortOrder: 9
  },
  {
    countryName: 'Oman',
    ISO2: 'OM',
    phoneCode: 968,
  },
  {
    countryName: 'Pakistan',
    ISO2: 'PK',
    phoneCode: 92,
  },
  {
    countryName: 'Palau',
    ISO2: 'PW',
    phoneCode: 680,
  },
  {
    countryName: 'Palestine',
    ISO2: 'PS',
    phoneCode: 970,
  },
  {
    countryName: 'Panama',
    ISO2: 'PA',
    phoneCode: 507,
  },
  {
    countryName: 'Papua New Guinea',
    ISO2: 'PG',
    phoneCode: 675,
  },
  {
    countryName: 'Paraguay',
    ISO2: 'PY',
    phoneCode: 595,
  },
  {
    countryName: 'Peru',
    ISO2: 'PE',
    phoneCode: 51,
  },
  {
    countryName: 'Philippines',
    ISO2: 'PH',
    phoneCode: 63,
  },
  {
    countryName: 'Pitcairn',
    ISO2: 'PN',
    phoneCode: 64,
  },
  {
    countryName: 'Poland',
    ISO2: 'PL',
    phoneCode: 48,
  },
  {
    countryName: 'Portugal',
    ISO2: 'PT',
    phoneCode: 351,
  },
  {
    countryName: 'Puerto Rico',
    ISO2: 'PR',
    phoneCode: '1-787, 1-939',
  },
  {
    countryName: 'Qatar',
    ISO2: 'QA',
    phoneCode: 974,
  },
  {
    countryName: 'Republic of the Congo',
    ISO2: 'CG',
    phoneCode: 242,
  },
  {
    countryName: 'Reunion',
    ISO2: 'RE',
    phoneCode: 262,
  },
  {
    countryName: 'Romania',
    ISO2: 'RO',
    phoneCode: 40,
  },
  {
    countryName: 'Russia',
    ISO2: 'RU',
    phoneCode: 7,
  },
  {
    countryName: 'Rwanda',
    ISO2: 'RW',
    phoneCode: 250,
  },
  {
    countryName: 'Saint Barthelemy',
    ISO2: 'BL',
    phoneCode: 590,
  },
  {
    countryName: 'Saint Helena',
    ISO2: 'SH',
    phoneCode: 290,
  },
  {
    countryName: 'Saint Kitts and Nevis',
    ISO2: 'KN',
    phoneCode: '1-869',
  },
  {
    countryName: 'Saint Lucia',
    ISO2: 'LC',
    phoneCode: '1-758',
  },
  {
    countryName: 'Saint Martin',
    ISO2: 'MF',
    phoneCode: 590,
  },
  {
    countryName: 'Saint Pierre and Miquelon',
    ISO2: 'PM',
    phoneCode: 508,
  },
  {
    countryName: 'Saint Vincent and the Grenadines',
    ISO2: 'VC',
    phoneCode: '1-784',
  },
  {
    countryName: 'Samoa',
    ISO2: 'WS',
    phoneCode: 685,
  },
  {
    countryName: 'San Marino',
    ISO2: 'SM',
    phoneCode: 378,
  },
  {
    countryName: 'Sao Tome and Principe',
    ISO2: 'ST',
    phoneCode: 239,
  },
  {
    countryName: 'Saudi Arabia',
    ISO2: 'SA',
    phoneCode: 966,
  },
  {
    countryName: 'Senegal',
    ISO2: 'SN',
    phoneCode: 221,
  },
  {
    countryName: 'Serbia',
    ISO2: 'RS',
    phoneCode: 381,
  },
  {
    countryName: 'Seychelles',
    ISO2: 'SC',
    phoneCode: 248,
  },
  {
    countryName: 'Sierra Leone',
    ISO2: 'SL',
    phoneCode: 232,
  },
  {
    countryName: 'Singapore',
    ISO2: 'SG',
    phoneCode: 65,
  },
  {
    countryName: 'Sint Maarten',
    ISO2: 'SX',
    phoneCode: '1-721',
  },
  {
    countryName: 'Slovakia',
    ISO2: 'SK',
    phoneCode: 421,
  },
  {
    countryName: 'Slovenia',
    ISO2: 'SI',
    phoneCode: 386,
  },
  {
    countryName: 'Solomon Islands',
    ISO2: 'SB',
    phoneCode: 677,
  },
  {
    countryName: 'Somalia',
    ISO2: 'SO',
    phoneCode: 252,
  },
  {
    countryName: 'South Africa',
    ISO2: 'ZA',
    phoneCode: 27,
  },
  {
    countryName: 'South Korea',
    ISO2: 'KR',
    phoneCode: 82,
  },
  {
    countryName: 'South Sudan',
    ISO2: 'SS',
    phoneCode: 211,
  },
  {
    countryName: 'Spain',
    ISO2: 'ES',
    phoneCode: 34,
    sortOrder: 7
  },
  {
    countryName: 'Sri Lanka',
    ISO2: 'LK',
    phoneCode: 94,
  },
  {
    countryName: 'Sudan',
    ISO2: 'SD',
    phoneCode: 249,
  },
  {
    countryName: 'Suriname',
    ISO2: 'SR',
    phoneCode: 597,
  },
  {
    countryName: 'Svalbard and Jan Mayen',
    ISO2: 'SJ',
    phoneCode: 47,
  },
  {
    countryName: 'Swaziland',
    ISO2: 'SZ',
    phoneCode: 268,
  },
  {
    countryName: 'Sweden',
    ISO2: 'SE',
    phoneCode: 46,
  },
  {
    countryName: 'Switzerland',
    ISO2: 'CH',
    phoneCode: 41,
    sortOrder: 5
  },
  {
    countryName: 'Syria',
    ISO2: 'SY',
    phoneCode: 963,
  },
  {
    countryName: 'Taiwan',
    ISO2: 'TW',
    phoneCode: 886,
  },
  {
    countryName: 'Tajikistan',
    ISO2: 'TJ',
    phoneCode: 992,
  },
  {
    countryName: 'Tanzania',
    ISO2: 'TZ',
    phoneCode: 255,
  },
  {
    countryName: 'Thailand',
    ISO2: 'TH',
    phoneCode: 66,
  },
  {
    countryName: 'Togo',
    ISO2: 'TG',
    phoneCode: 228,
  },
  {
    countryName: 'Tokelau',
    ISO2: 'TK',
    phoneCode: 690,
  },
  {
    countryName: 'Tonga',
    ISO2: 'TO',
    phoneCode: 676,
  },
  {
    countryName: 'Trinidad and Tobago',
    ISO2: 'TT',
    phoneCode: '1-868',
    sortOrder: 12
  },
  {
    countryName: 'Tunisia',
    ISO2: 'TN',
    phoneCode: 216,
  },
  {
    countryName: 'Turkey',
    ISO2: 'TR',
    phoneCode: 90,
  },
  {
    countryName: 'Turkmenistan',
    ISO2: 'TM',
    phoneCode: 993,
  },
  {
    countryName: 'Turks and Caicos Islands',
    ISO2: 'TC',
    phoneCode: '1-649',
  },
  {
    countryName: 'Tuvalu',
    ISO2: 'TV',
    phoneCode: 688,
  },
  {
    countryName: 'U.S. Virgin Islands',
    ISO2: 'VI',
    phoneCode: '1-340',
  },
  {
    countryName: 'Uganda',
    ISO2: 'UG',
    phoneCode: 256,
  },
  {
    countryName: 'Ukraine',
    ISO2: 'UA',
    phoneCode: 380,
    phoneMask: `\\d\\d-\\d\\d\\d-\\d\\d-\\d\\d`
  },
  {
    countryName: 'United Arab Emirates',
    ISO2: 'AE',
    phoneCode: 971,
  },
  {
    countryName: 'United Kingdom',
    ISO2: 'GB',
    phoneCode: 44,
    phoneMask: '\\d\\d\\d \\d\\d\\d\\d \\d\\d\\d\\d',
    sortOrder: 1
  },
  {
    countryName: 'United States',
    ISO2: 'US',
    phoneCode: 1,
    phoneMask: '\\(\\d\\d\\d\\)-\\d\\d\\d-\\d\\d\\d\\d',
    sortOrder: -1
  },
  {
    countryName: 'Uruguay',
    ISO2: 'UY',
    phoneCode: 598,
  },
  {
    countryName: 'Uzbekistan',
    ISO2: 'UZ',
    phoneCode: 998,
  },
  {
    countryName: 'Vanuatu',
    ISO2: 'VU',
    phoneCode: 678,
  },
  {
    countryName: 'Vatican',
    ISO2: 'VA',
    phoneCode: 379,
  },
  {
    countryName: 'Venezuela',
    ISO2: 'VE',
    phoneCode: 58,
  },
  {
    countryName: 'Vietnam',
    ISO2: 'VN',
    phoneCode: 84,
  },
  {
    countryName: 'Wallis and Futuna',
    ISO2: 'WF',
    phoneCode: 681,
  },
  {
    countryName: 'Western Sahara',
    ISO2: 'EH',
    phoneCode: 212,
  },
  {
    countryName: 'Yemen',
    ISO2: 'YE',
    phoneCode: 967,
  },
  {
    countryName: 'Zambia',
    ISO2: 'ZM',
    phoneCode: 260,
  },
  {
    countryName: 'Zimbabwe',
    ISO2: 'ZW',
    phoneCode: 263,
  }
]
