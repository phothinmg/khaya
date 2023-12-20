const translate = ({ text, lang }) => {
    const a = [
        [
            " ",
            "Myanmar Year",
            "မြန်မာနှစ်"
        ],
        [
            " ",
            "Good Friday",
            "သောကြာနေ့ကြီး"
        ],
        [
            " ",
            "New Year's",
            "နှစ်ဆန်း"
        ],
        [
            " ",
            "Independence",
            "လွတ်လပ်ရေး"
        ],
        [
            " ",
            "Union",
            "ပြည်ထောင်စု"
        ],
        [
            " ",
            "Peasants'",
            "တောင်သူလယ်သမား"
        ],
        [
            " ",
            "Resistance",
            "တော်လှန်ရေး"
        ],
        [
            " ",
            "Labour",
            "အလုပ်သမား"
        ],
        [
            " ",
            "Martyrs'",
            "အာဇာနည်"
        ],
        [
            " ",
            "Christmas",
            "ခရစ္စမတ်"
        ],
        [
            " ",
            "Buddha",
            "ဗုဒ္ဓ"
        ],
        [
            " ",
            "Start of Buddhist Lent",
            "ဓမ္မစကြာနေ့"
        ],
        [
            " ",
            "End of Buddhist Lent",
            "မီးထွန်းပွဲ"
        ],
        [
            " ",
            "Tazaungdaing",
            "တန်ဆောင်တိုင်"
        ],
        [
            " ",
            "National",
            "အမျိုးသား"
        ],
        [
            " ",
            "Karen",
            "ကရင်"
        ],
        [
            " ",
            "Pwe",
            "ပွဲ"
        ],
        [
            " ",
            "Thingyan",
            "သင်္ကြန်"
        ],
        [
            " ",
            "Akyo",
            "အကြို"
        ],
        [
            " ",
            "Akyat",
            "အကြတ်"
        ],
        [
            " ",
            "Akya",
            "အကျ"
        ],
        [
            " ",
            "Atat",
            "အတက်"
        ],
        [
            " ",
            "Amyeittasote"
        ],
        [
            " ",
            "Warameittugyi",
            "ဝါရမိတ္တုကြီး"
        ],
        [
            " ",
            "Warameittunge",
            "ဝါရမိတ္တုငယ်"
        ],
        [
            " ",
            "Thamaphyu",
            "သမားဖြူ"
        ],
        [
            " ",
            "Thamanyo",
            "သမားညို"
        ],
        [
            " ",
            "Yatpote",
            "ရက်ပုပ်"
        ],
        [
            " ",
            "Yatyotema",
            "ရက်ယုတ်မာ"
        ],
        [
            " ",
            "Mahayatkyan",
            "မဟာရက်ကြမ်း"
        ],
        [
            " ",
            "Nagapor",
            "နဂါးပေါ်"
        ],
        [
            " ",
            "Shanyat",
            "ရှမ်းရက်"
        ],
        [
            " ",
            "Mooon",
            "မွန်"
        ],
        [
            " ",
            "G. Aung San BD",
            "ဗိုလ်ချုပ်မွေးနေ့"
        ],
        [
            " ",
            "Valentines",
            "ချစ်သူများ"
        ],
        [
            " ",
            "Earth",
            "ကမ္ဘာမြေ"
        ],
        [
            " ",
            "April Fools'",
            "ဧပြီအရူး"
        ],
        [
            " ",
            "Red Cross",
            "ကြက်ခြေနီ"
        ],
        [
            " ",
            "United Nations",
            "ကုလသမ္မဂ္ဂ"
        ],
        [
            " ",
            "Halloween",
            "သရဲနေ့"
        ],
        [
            " ",
            "Shan",
            "ရှမ်း"
        ],
        [
            " ",
            "Mothers'",
            "အမေများ"
        ],
        [
            " ",
            "Fathers'",
            "အဖေများ"
        ],
        [
            " ",
            "Sasana Year",
            "သာသနာနှစ်"
        ],
        [
            " ",
            "Eid",
            "အိဒ်"
        ],
        [
            " ",
            "Diwali",
            "ဒီဝါလီ"
        ],
        [
            " ",
            "Mahathamaya"
        ],
        [
            " ",
            "Garudhamma"
        ],
        [
            " ",
            "Metta",
            "မေတ္တာ"
        ],
        [
            " ",
            "Taungpyone",
            "တောင်ပြုန်း"
        ],
        [
            " ",
            "Yadanagu",
            "ရတနာ့ဂူ"
        ],
        [
            " ",
            "Authors'",
            "စာဆိုတော်"
        ],
        [
            " ",
            "World",
            "ကမ္ဘာ့"
        ],
        [
            " ",
            "Teachers'",
            "ဆရာများ"
        ],
        [
            " ",
            "Holiday",
            "ရုံးပိတ်ရက်"
        ],
        [
            " ",
            "Chinese",
            "တရုတ်"
        ],
        [
            " ",
            "Easter",
            "ထမြောက်ရာနေ့"
        ],
        [
            " ",
            "0",
            "၀"
        ],
        [
            " ",
            "1",
            "၁"
        ],
        [
            " ",
            "2",
            "၂"
        ],
        [
            " ",
            "3",
            "၃"
        ],
        [
            " ",
            "4",
            "၄"
        ],
        [
            " ",
            "5",
            "၅"
        ],
        [
            " ",
            "6",
            "၆"
        ],
        [
            " ",
            "7",
            "၇"
        ],
        [
            " ",
            "8",
            "၈"
        ],
        [
            " ",
            "9",
            "၉"
        ],
        [
            " ",
            "Sunday",
            "တနင်္ဂနွေ"
        ],
        [
            " ",
            "Monday",
            "တနင်္လာ"
        ],
        [
            " ",
            "Tuesday",
            "အင်္ဂါ"
        ],
        [
            " ",
            "Wednesday",
            "ဗုဒ္ဓဟူး"
        ],
        [
            " ",
            "Thursday",
            "ကြာသပတေး"
        ],
        [
            " ",
            "Friday",
            "သောကြာ"
        ],
        [
            " ",
            "Saturday",
            "စနေ"
        ],
        [
            " ",
            "Sabbath Eve",
            "အဖိတ်"
        ],
        [
            " ",
            "Sabbath",
            "ဥပုသ်"
        ],
        [
            " ",
            "Yatyaza",
            "ရက်ရာဇာ"
        ],
        [
            " ",
            "Pyathada",
            "ပြဿဒါး"
        ],
        [
            " ",
            "Afternoon",
            "မွန်းလွဲ"
        ],
        [
            " ",
            "January",
            "ဇန်နဝါရီ"
        ],
        [
            " ",
            "February",
            "ဖေဖော်ဝါရီ"
        ],
        [
            " ",
            "March",
            "မတ်"
        ],
        [
            " ",
            "April",
            "ဧပြီ"
        ],
        [
            " ",
            "May",
            "မေ"
        ],
        [
            " ",
            "June",
            "ဇွန်"
        ],
        [
            " ",
            "July",
            "ဇူလိုင်"
        ],
        [
            " ",
            "August",
            "ဩဂုတ်"
        ],
        [
            " ",
            "September",
            "စက်တင်ဘာ"
        ],
        [
            " ",
            "October",
            "အောက်တိုဘာ"
        ],
        [
            " ",
            "November",
            "နိုဝင်ဘာ"
        ],
        [
            " ",
            "December",
            "ဒီဇင်ဘာ"
        ],
        [
            " ",
            "Tagu",
            "တန်ခူး"
        ],
        [
            " ",
            "Kason",
            "ကဆုန်"
        ],
        [
            " ",
            "Nayon",
            "နယုန်"
        ],
        [
            " ",
            "Waso",
            "ဝါဆို"
        ],
        [
            " ",
            "Wagaung",
            "ဝါခေါင်"
        ],
        [
            " ",
            "Tawthalin",
            "တော်သလင်း"
        ],
        [
            " ",
            "Thadingyut",
            "သီတင်းကျွတ်"
        ],
        [
            " ",
            "Tazaungmon",
            "တန်ဆောင်မုန်း"
        ],
        [
            " ",
            "Nadaw",
            "နတ်တော်"
        ],
        [
            " ",
            "Pyatho",
            "ပြာသို"
        ],
        [
            " ",
            "Tabodwe",
            "တပို့တွဲ"
        ],
        [
            " ",
            "Tabaung",
            "တပေါင်း"
        ],
        [
            " ",
            "First",
            "ပ"
        ],
        [
            " ",
            "Second",
            "ဒု"
        ],
        [
            " ",
            "Late",
            "နှောင်း"
        ],
        [
            " ",
            "Waxing",
            "လဆန်း"
        ],
        [
            " ",
            "Waning",
            "လဆုတ်"
        ],
        [
            " ",
            "Full Moon",
            "လပြည့်"
        ],
        [
            " ",
            "New Moon",
            "လကွယ်"
        ],
        [
            " ",
            "Nay",
            "နေ့"
        ],
        [
            " ",
            "Day",
            "နေ့"
        ],
        [
            " ",
            "Yat",
            "ရက်"
        ],
        [
            " ",
            "Year",
            "နှစ်"
        ],
        [
            " ",
            "Ku",
            "ခု"
        ],
        [
            " ",
            "Naga",
            "နဂါး"
        ],
        [
            " ",
            "Head",
            "ခေါင်း"
        ],
        [
            " ",
            "Facing",
            "လှည့်"
        ],
        [
            " ",
            "East",
            "အရှေ့"
        ],
        [
            " ",
            "West",
            "အနောက်"
        ],
        [
            " ",
            "South",
            "တောင်"
        ],
        [
            " ",
            "North",
            "မြောက်"
        ],
        [
            " ",
            "Mahabote",
            "မဟာဘုတ်"
        ],
        [
            " ",
            "Born",
            "ဖွား"
        ],
        [
            " ",
            "Binga",
            "ဘင်္ဂ"
        ],
        [
            " ",
            "Atun",
            "အထွန်း"
        ],
        [
            " ",
            "Yaza",
            "ရာဇ"
        ],
        [
            " ",
            "Adipati",
            "အဓိပတိ"
        ],
        [
            " ",
            "Marana",
            "မရဏ"
        ],
        [
            " ",
            "Thike",
            "သိုက်"
        ],
        [
            " ",
            "Puti",
            "ပုတိ"
        ],
        [
            " ",
            "Ogre",
            "ဘီလူး"
        ],
        [
            " ",
            "Elf",
            "နတ်"
        ],
        [
            " ",
            "Human",
            "လူ"
        ],
        [
            " ",
            "Nakhat",
            "နက္ခတ်"
        ],
        [
            " ",
            "Hpusha",
            "ပုဿ"
        ],
        [
            " ",
            "Magha",
            "မာခ"
        ],
        [
            " ",
            "Phalguni",
            "ဖ္လကိုန်"
        ],
        [
            " ",
            "Chitra",
            "စယ်"
        ],
        [
            " ",
            "Visakha",
            "ပိသျက်"
        ],
        [
            " ",
            "Jyeshtha",
            "စိဿ"
        ],
        [
            " ",
            "Ashadha",
            "အာသတ်"
        ],
        [
            " ",
            "Sravana",
            "သရဝန်"
        ],
        [
            " ",
            "Bhadrapaha",
            "ဘဒြ"
        ],
        [
            " ",
            "Asvini",
            "အာသိန်"
        ],
        [
            " ",
            "Krittika",
            "ကြတိုက်"
        ],
        [
            " ",
            "Mrigasiras",
            "မြိက္ကသိုဝ်"
        ],
        [
            " ",
            "Calculator",
            "တွက်စက်"
        ]
    ];
    let fstr, rstr, re;
    let fromLn = 1;
    let toLn = lang;
    let l = a.length;
    for (let i = 0; i < l; i++) {
        fstr = a[i][fromLn];
        re = new RegExp(fstr, 'g');
        rstr = a[i][toLn];
        text = text.replace(re, rstr);
    }
    return text;
};
export default translate;
//# sourceMappingURL=translate.js.map