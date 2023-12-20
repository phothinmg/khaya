
//https://github.com/kanasimi/CeJS/blob/ef4eacd9b6bff920c9696dc739884054ddd70c45/data/date/calendar.js#L2158
// Myanmar calendar, 緬曆, 緬甸曆法, မြန်မာသက္ကရာဇ်.

// References:

// Wikipedia: Burmese calendar
// https://en.wikipedia.org/wiki/Burmese_calendar

// Irwin(1909)
// The Burmese & Arakanese calendars
// Irwin, Alfred Macdonald Bulteel. (A.M.B. Irwin) 1853-
// https://archive.org/details/burmesearakanese00irwiiala

// Cool Emerald(2015)
// Cool Emerald: Algorithm, Program and Calculation of Myanmar Calendar
// http://cool-emerald.blogspot.sg/2013/06/algorithm-program-and-calculation-of.html
// "My algorithm is only designed for ME years >= 0"

// Cool Emerald(2015/5)
// https://plus.google.com/u/1/+YanNaingAye-Mdy/posts/1eMwo3CbrWZ


// Irwin(1909) paragraph 34.
// According to the Surya Siddhanta a maha-yug of
// 4,320,000 years contains
// 1,577,917,828 days.
// 1,603,000,080 didi.
// 25,082,252 kaya.
// 51,840,000 solar months.
// 53,433,336 lunar months.
// 1,593,336 adimath.
//
// https://en.wikipedia.org/wiki/Yuga
// MAHAYUG: 1200*(4*360)+1200*(3*360)+1200*(2*360)+1200*(1*360) = 4320000
//
// mean tropical year days  (Thandeikta solar year, ayana hnit)
// ≈ 365.2587564814814814814814814814814814814814814814814814814814...
var Myanmar_YEAR_DAYS = 1577917828 / 4320000,
// ONE_DAY_LENGTH_VALUE * Myanmar_YEAR_DAYS
// = 31558356560
Myanmar_YEAR_LENGTH_VALUE = ONE_DAY_LENGTH_VALUE / 4320000 * 1577917828,
// mean synodic month days (Thandeikta lunar month)
// ≈ 29.53058794607171822474269620747617180405879954790769567522417...
Myanmar_MONTH_DAYS = 1577917828 / 53433336,

// accumulated solar days of every month.
// = Myanmar_YEAR_DAYS / 12 - Myanmar_MONTH_DAYS
// = 26189096670773/28854001440000
// ≈ 0.907641760718405232047427249313951652731323908882427781565952...
// cf. epact: the moon age when tropical year starts. https://en.wikipedia.org/wiki/Epact
Myanmar_month_accumulated_days = Myanmar_YEAR_DAYS / 12 - Myanmar_MONTH_DAYS,

// https://en.wikipedia.org/wiki/Kali_Yuga
// According to the Surya Siddhanta, Kali Yuga began at midnight (00:00) on 18 February 3102 BCE in the proleptic Julian calendar
//
// Cool Emerald(2015)
// The Kali Yuga year number can be obtained by adding 3739 to the Myanmar year.
// The start of Kali Yuga in the Myanmar calendar is found to be 588465.560139 in Julian date. (MO - 3739 SY)
Myanmar_Kali_Yuga_offset = 3739,
// The first era: The era of Myanmar kings
// The second era: The era under British colony
Myanmar_era_2_year = 1217,
// The third era: The era after Independence
Myanmar_era_3_year = 1312,
// Irwin(1909) paragraph 50.
// The difference in time between the entry of the apparent sun and that of the mean sun into the sign Meiktha is called in India Sodhya, and in Burma Thingyan. The length of this period is fixed at 2 yet 10 nayi and 3 bizana (2 days 4 hours 1 minute and 12 seconds).
// The day on which the Thingyan commences is called Thingyan Kya, and the day on which it ends Thingyan Tet.
// = 187272000
Myanmar_Thingyan_LENGTH_VALUE = new Date(0, 0, 2, 4, 1, 12) - new Date(0, 0, 0, 0, 0, 0),
// Cool Emerald(2015)
// A typical Myanmar calendar mentions the beginning of the year called the atat time and it is the end of the Thingyan. The starting time of the Thingyan is called the akya time.
// The length of the Thingyan currently recognized by Myanmar Calendar Advisory Board is 2.169918982 days ( 2days, 4 hours, 4 minutes and 41 seconds). When the time of ancient Myanmar kings, 2.1675 days (2 days, 4 hours, 1 min and 12 seconds) was used as the length of the Thingyan.
// = 187481000
Myanmar_Thingyan_3rd_LENGTH_VALUE = new Date(0, 0, 2, 4, 4, 41) - new Date(0, 0, 0, 0, 0, 0),
// local timezone offset value
TIMEZONE_OFFSET_VALUE = String_to_Date.default_offset * (ONE_DAY_LENGTH_VALUE / 24 / 60),

// Myanmar_cache[reference][year] = year data = {
//	Tagu_1st: time value of Tagu 1st,
//	watat: watat type (0: common / 1: little watat / 2: big watat),
//	full_moon: time value of full moon day of watat year
// }
Myanmar_cache = [ [], [] ],
// Myanmar_month_days[ watat : 0, 1, 2 ]
// = [ days of month 1 (Tagu), days of month 2, ... ]
Myanmar_month_days = [],
// Myanmar_month_days_count[ watat : 0, 1, 2 ]
// = [ accumulated days of month 1 (Tagu), accumulated days of month 2, ... ]
Myanmar_month_days_count = [],

// @see https://github.com/yan9a/mcal/blob/master/mc.js
// 1060: beginning of well-known (historical) Myanmar year
// well-known exceptions
Myanmar_adjust_watat = {
	// Thandeikta (ME 1100 - 1216)
	1201 : true,
	1202 : false,

	// The second era (the era under British colony: 1217 ME - 1311 ME)
	1263 : true,
	1264 : false,

	// The third era (the era after Independence	1312 ME and after)
	1344 : true,
	1345 : false
},
// well-known exceptions
Myanmar_adjust_fullmoon = {
	// Thandeikta (ME 1100 - 1216)
	1120 : 1,
	1126 : -1,
	1150 : 1,
	1172 : -1,
	1207 : 1,

	// The second era (the era under British colony: 1217 ME - 1311 ME)
	1234 : 1,
	1261 : -1,

	// The third era (the era after Independence	1312 ME and after)
	1377 : 1
},
// for fullmoon: Cool Emerald - Based on various evidence such as inscriptions, books, etc...
// Cool Emerald(2015/11)
// got modified dates based on feedback from U Aung Zeya who referred to multiple resources such as Mhan Nan Yar Za Win, Mahar Yar Za Win, J. C. Eade, and inscriptions etc...
Myanmar_adjust_CE = {
	// Makaranta system 1 (ME 0 - 797)
	205 : 1,
	246 : 1,
	471 : 1,
	572 : -1,
	651 : 1,
	653 : 2,
	656 : 1,
	672 : 1,
	729 : 1,
	767 : -1,

	// Makaranta system 2 (ME 798 - 1099)
	813 : -1,
	849 : -1,
	851 : -1,
	854 : -1,
	927 : -1,
	933 : -1,
	936 : -1,
	938 : -1,
	949 : -1,
	952 : -1,
	963 : -1,
	968 : -1,
	1039 : -1
},
// for fullmoon: Tin Naing Toe & Dr. Than Tun
// Cool Emerald(2015/5)
// from T. N. Toe (1999) which he said referred from Dr. Than Tun and Irwin. I am currently building that of Irwin (xIRWIN)  and J. C. Eade (xEADE) to add in the calendar.﻿
Myanmar_adjust_TNT = {
	205 : 1,
	246 : 1,
	813 : -1,
	854 : -1,
	1039 : -1
},
// references before 1060.
Myanmar_reference =[ Myanmar_adjust_CE, Myanmar_adjust_TNT ];



// Year 0 date
// https://en.wikipedia.org/wiki/Burmese_calendar
// (Luce Vol. 2 1970: 336): According to planetary positions, the current Burmese era technically began at 11:11:24 on 22 March 638.
if (false)
	Myanmar_Date.epoch = String_to_Date('638/3/22 11:11:24', {
		parser : 'Julian'
	}).getTime();

// Cool Emerald(2015/5)
// ME 1377 (my=1377) Myanmar calendar says new year time is 2015-Apr-16 20:35:57
// = 638/3/22 13:12:53.880 local time	(new Date(CeL.Myanmar_Date.epoch).format('CE'))
// Myanmar_Date.epoch = new Date(2015, 4 - 1, 16, 20, 35, 57) - 1377 * Myanmar_YEAR_LENGTH_VALUE;

// Cool Emerald(2018/7)
// beginning of 0 ME: MO is estimated as Julian Date 1954168.050623.
Myanmar_Date.epoch = library_namespace.JD_to_Date(1954168.050623).getTime();

// 'နှောင်း': Hnaung (e.g., Hnaung Tagu, Late Tagu)
Myanmar_Date.month_name = 'ဦးတပေါင်း|တန်ခူး|ကဆုန်|နယုန်|ဝါဆို|ဝါခေါင်|တော်သလင်း|သီတင်းကျွတ်|တန်ဆောင်မုန်း|နတ်တော်|ပြာသို|တပို့တွဲ|တပေါင်း|နှောင်းတန်ခူး|နှောင်းကဆုန်'
	.split('|');
// intercalary month
// 'ဒု': Second (e.g., Second Waso)
Myanmar_Date.month_name.waso = [ 'ပဝါဆို', 'ဒုဝါဆို' ];

Myanmar_Date.month_name.en = 'Early Tabaung|Tagu|Kason|Nayon|Waso|Wagaung|Tawthalin|Thadingyut|Tazaungmon|Nadaw|Pyatho|Tabodwe|Tabaung|Late Tagu|Late Kason'
	.split('|');
Myanmar_Date.month_name.en.waso = [ 'First Waso', 'Second Waso' ];

// Irwin(1909) paragraph 38.
// In Burma the zero of celestial longitude does not move with the precession of the equinoxes as in Europe.
// Irwin(1909) paragraph 104.
// The equinox is said to have coincided with Thingyan Kya about 207 years before Poppasaw's epoch, i.e., about 411 A.D.
// Irwin(1909) paragraph 107.
// Through the accumulation of precession, Thingyan Kya is now about 24 days after the vernal equinox.

// initialization of accumulated days / month name
(function() {
	function push_queue() {
		(m = month_name.slice())
		// reverse index
		.forEach(function(value, index) {
			m[value] = index;
		});

		(m.en = month_name.en.slice())
		// reverse index
		.forEach(function(value, index) {
			m[value] = index;
		});

		queue.month = m;
		Myanmar_month_days_count.push(queue);
	}

	var m, count = 0, days, queue = [ count ],
	// days in the month
	month_days = [],
	// new year's day often falls on middle Tagu, even Kason.
	month_name = Myanmar_Date.month_name.slice();
	month_name.en = Myanmar_Date.month_name.en.slice();

	for (m = 0; m < month_name.length; m++) {
		month_days.push(days = m % 2 === 0 ? 29 : 30);
		queue.push(count += days);
	}
	push_queue();

	Myanmar_month_days.push(month_days.slice());
	month_days.splice(5 - 1, 0, 30);
	Myanmar_month_days.push(month_days.slice());
	month_days[2]++;
	Myanmar_month_days.push(month_days);

	// insert leap month, 2nd Waso
	queue = queue.slice();
	// 5: index of 2nd Waso
	queue.splice(5, 0, queue[5 - 1]);

	// adapt intercalary month name.
	m = Myanmar_Date.month_name.waso;
	month_name.splice(5 - 1, 1, m[0], m[1]);
	m = Myanmar_Date.month_name.en.waso;
	month_name.en.splice(5 - 1, 1, m[0], m[1]);

	// add accumulated days to all months after 2nd Waso
	for (m = 5; m < month_name.length; m++)
		queue[m] += 30;
	push_queue();

	queue = queue.slice();
	// add 1 day to all months after 30 days Nayon
	// 3: index of Nayon
	for (m = 3; m < month_name.length; m++)
		queue[m]++;
	push_queue();
})();


// Cool Emerald(2015)
// The day before the akya day is called the akyo day (the Thingyan eve).
// the day after the atat day is called new year's day.
// The days between the akya day and the atat day are called akyat days.
/**
 * get year start date of Myanmar calendar.<br />
 * Using integer to calculate Myanmar new year's day.
 *
 * @param {Integer}year
 *            year of Myanmar calendar.
 * @param {Object}[options]
 *            options to use
 *
 * @returns {Date} system Date (proleptic Gregorian calendar with year 0)
 */
Myanmar_Date.new_year_Date = function(year, options) {
	var date = Myanmar_Date.epoch + year * Myanmar_YEAR_LENGTH_VALUE,
	// remainder: time value after local midnight of the date.
	// (date + TIMEZONE_OFFSET_VALUE): convert ((date)) to UTC so we can use .mod(ONE_DAY_LENGTH_VALUE) to reckon the time value.
	// Because (date at UTC+0 midnight).mod(ONE_DAY_LENGTH_VALUE) === 0.
	remainder = (date + TIMEZONE_OFFSET_VALUE).mod(ONE_DAY_LENGTH_VALUE), info,
	// get detail information.
	detail = options && options.detail;

	if (detail)
		info = {
			// * Thingyan start: Thingyan Kya, akya time
			start_time : date - (year < Myanmar_era_3_year ? Myanmar_Thingyan_LENGTH_VALUE
			//
			: Myanmar_Thingyan_3rd_LENGTH_VALUE),
			// * Thingyan end: Thingyan Tet, atat time
			end_time : date
		};

	// Convert the date to local midnight of next day, the new year's day.
	// assert: The remainder should bigger than 0.
	date += ONE_DAY_LENGTH_VALUE - remainder;

	if (!detail)
		// local midnight of new year's day
		return options && options.get_value ? date : new Date(date);

	// get time and more information.
	// new year's day (local midnight)
	info.new_year = date;
	// Thingyan end day: atat day (local midnight)
	info.end = date - ONE_DAY_LENGTH_VALUE;

	date = info.start_time;
	// assert: The remainder should bigger than 0.
	date -= (date + TIMEZONE_OFFSET_VALUE).mod(ONE_DAY_LENGTH_VALUE);
	// Thingyan (သႀကၤန္), Myanmar new year festival: akya day (local midnight)
	info.start = date;
	// Thingyan eve: akyo day (local midnight)
	info.eve = date - ONE_DAY_LENGTH_VALUE;

	if (false)
		for (date in info)
			info[date] = (new Date(info[date])).format('CE');

	// info.eve: Thingyan eve: akyo day
	// info.start: Thingyan start day, Myanmar new year festival, 潑水節: akya day
	// info.start_time: Thingyan start: Thingyan Kya, akya time
	//
	// days between akya day, atat day: akyat days
	//
	// info.end: Thingyan end day: atat day
	// info.end_time: Thingyan end: Thingyan Tet, atat time
	// info.new_year: new year's day
	return info;
};



/*

# Myanmar leap year

Myanmar leap year on 2,5,7,10,13,15,18 / 19

** But Wikipedia denotes prior to 1740, it's 2, 5, 8, 10, 13, 16, 18.

for(var i=0;i<19;i++){for(var y=0,_y,l=[];y<19;y++){_y=(7*y+i)%19;if(_y<7)l.push(y);}console.log(i+':'+l);}
// 9:2,5,7,10,13,15,18
@see Tabular_list_leap()

→ Myanmar year is a leap year if:
(7*year+9).mod(19)<7

*/

/**
 * check if it's a watat year.<br />
 *
 * @param {Integer}year
 *            year of Myanmar calendar.
 * @param {Integer}[reference]
 *            reference to use. see Myanmar_reference.
 *
 * @returns {Date} system Date (proleptic Gregorian calendar with year 0)
 */
Myanmar_Date.watat_data = function(year, reference) {
	var cache = Myanmar_cache[reference |= 0];
	if (year in cache)
		return cache[year];

	var accumulated_months = year < Myanmar_era_2_year ? -1 : year < Myanmar_era_3_year ? 4 : 8,
	// reckon excess days
	excess_days = ((year + Myanmar_Kali_Yuga_offset) * Myanmar_YEAR_DAYS) % Myanmar_MONTH_DAYS;
	// adjust excess days
	if (excess_days < Myanmar_month_accumulated_days * (12 - accumulated_months))
		excess_days += Myanmar_MONTH_DAYS;

	// Using historical data directly.
	var watat = year in Myanmar_adjust_watat ? Myanmar_adjust_watat[year]
	// find watat by 19 years metonic cycle.
	// see "# Myanmar leap year" above.
	: year < Myanmar_era_2_year ? (7 * year + 9).mod(19) < 7
	// find watat based on excess days. value below denotes threshold for watat.
	: excess_days >= Myanmar_MONTH_DAYS - Myanmar_month_accumulated_days * accumulated_months;

	// the full moon day of Second Waso only needs to reckon in the watat year.
	if (!watat)
		return cache[year] = {
			watat : 0
		};

	// reckon the full moon day of second Waso

	// Use TIMEZONE_OFFSET_VALUE & Math.floor() to convert between UTC and local time,
	// to get local midnight of specified date.
	var fullmoon = Math.floor((Myanmar_Date.epoch + TIMEZONE_OFFSET_VALUE) / ONE_DAY_LENGTH_VALUE
		// full moon accumulated days from Myanmar_Date.epoch
		+ (year * Myanmar_YEAR_DAYS - excess_days + 4.5 * Myanmar_MONTH_DAYS
		// 1.1, 0.85:
		// The constant which is used to adjust the full moon time of Second Waso is denoted by WO and its value for the third era is therefore -0.5.
		// By analyzing ME table [Toe, 1999], to fit them to our method,
		// we've got two offsets as 1.1 and 0.85 for before and after ME 1100
		// respectively
		- (year < 1100 ? 1.1 : year < Myanmar_era_2_year ? 0.85
		// 4 / accumulated_months:
		// it is 4 and half month from the latest new moon before new year
		// 2 nd era is 1 day earlier and 3rd ear is 0.5 day earlier (i.e. to make full
		// moon at midnight instead of noon)
		: 4 / accumulated_months))
		);

	// adjust for exceptions
	var table
	// 1060: beginning of well-known (historical) Myanmar year
	= year < 1060 ? reference && Myanmar_reference[reference] || Myanmar_reference[0] : Myanmar_adjust_fullmoon;
	if (year in table)
		fullmoon += table[year];

	return cache[year] = {
		// is watat year
		watat : true,
		// to get local midnight of specified date.
		fullmoon : fullmoon * ONE_DAY_LENGTH_VALUE - TIMEZONE_OFFSET_VALUE
	};
};


/**
 * get information of year. e.g., watat year, full moon day.<br />
 * Here we use the algorithm developed by Yan Naing Aye.
 *
 * @param {Integer}year
 *            year of Myanmar calendar.
 * @param {Object}[options]
 *            options to use
 *
 * @returns {Object} year data {<br />
 *          watat : 0: common / 1: little watat / 2: big watat,<br />
 *          Tagu_1st : The first day of Tagu<br />
 *          fullmoon : full moon day of 2nd Waso<br /> }
 *
 * @see http://cool-emerald.blogspot.sg/2013/06/algorithm-program-and-calculation-of.html
 * @see http://mmcal.blogspot.com
 */
Myanmar_Date.year_data = function(year, options) {
	var year_data = Myanmar_Date.watat_data(year),
	//
	reference = (options && options.reference) | 0;
	// "TypeError: invalid 'in' operand year_data" for minus years
	if ('Tagu_1st' in year_data)
		return year_data;

	var last_watat_year = year, last_watat_data;
	while (0 === (last_watat_data
	// find the lastest watat year before this year.
	= Myanmar_Date.watat_data(--last_watat_year, reference)).watat);

	if (year_data.watat)
		// This year is a watat year, and test if it is a big watat year.
		year_data.watat
		// assert: (... % 354) should be 30 or 31.
		= (year_data.fullmoon - last_watat_data.fullmoon) / ONE_DAY_LENGTH_VALUE
		// 354: common year days.
		% 354 === 31 ? 2 : 1;

	// Tagu 1st time value
	// The first day of Tagu is not only determined by the full moon day of that year.
	year_data.Tagu_1st = last_watat_data.fullmoon + (354 * (year - last_watat_year) - 102) * ONE_DAY_LENGTH_VALUE;

	return year_data;
};


/**
 * get days count of specified year.<br />
 * The sum of all days should be 365 or 366.
 *
 * @param {Integer}year
 *            year of Myanmar calendar.
 * @param {Object}[options]
 *            options to use
 *
 * @returns {Array} days count
 */
Myanmar_Date.month_days = function(year, options) {
	var year_data = Myanmar_Date.year_data(year),
	end = Myanmar_Date.new_year_Date(year + 1, {
		get_value : true
	}),
	// the last day of the year counts from Tagu 1.
	date = Date_to_Myanmar(end - ONE_DAY_LENGTH_VALUE, {
		format : 'serial'
	}),
	//
	month_days = Myanmar_month_days[year_data.watat].slice(0, date[1] - 1);
	month_days.end = end;
	month_days.end_date = date;
	month_days.push(date[2]);

	month_days.start_date
	// date (new year's day) counts from Tagu 1.
	= date = Date_to_Myanmar(month_days.start = Myanmar_Date.new_year_Date(year, {
		get_value : true
	}), {
		format : 'serial'
	});

	if (date[1] < 1)
		// assert: date[1] === 0
		// Early Tabaung: 30 days
		month_days.unshift(30 + 1 - date[2]);
	else
		month_days.splice(0, date[1], month_days[date[1] - 1] + 1 - date[2]);

	if (options && ('start_month' in options)
	// assert: options.start_month < date[1]. e.g., ((0))
	&& (end = date[1] - options.start_month) > 0)
		Array.prototype.unshift.apply(month_days, new Array(end).fill(0));

	return month_days;
};


/**
 * get Date of Myanmar calendar.<br />
 * Myanmar date → Date
 *
 * @param {Integer}year
 *            year of Myanmar calendar.
 * @param {Natural}month
 *            month of Myanmar calendar.<br />
 *            Using 1 for Oo Tagu (Early Tagu) and 13 (14) for Hnaung Tagu (Late Tagu).
 * @param {Natural}date
 *            date of Myanmar calendar.
 * @param {Object}[options]
 *            options to use
 *
 * @returns {Date} system Date (proleptic Gregorian calendar with year 0)
 */
function Myanmar_Date(year, month, date, options) {
	var year_data = Myanmar_Date.year_data(year, options);
	if (isNaN(date))
		date = 1;

	// reckon days count from Tagu 1
	var month_days = Myanmar_month_days_count[year_data.watat];
	if (isNaN(month))
		// e.g., CeL.Myanmar_Date(1370,'Tawthalin',18).format()
		// @see 'reverse index' of push_queue()
		// may get invalid month name.
		month = month_days.month[month];

	// e.g., 654/3/23 CE
	// treat as the last month, 'Early Tabaung' (30 days) of last year.
	if (month === 0)
		// - 1: serial to index.
		date -= 30 + 1;
	else
		// -1: serial to index.
		date += month_days[month - 1 || 0] - 1;

	return new Date(year_data.Tagu_1st + date * ONE_DAY_LENGTH_VALUE);
}

_.Myanmar_Date = Myanmar_Date;


/**
 * get Myanmar calendar (of Date).<br />
 * Date → Myanmar date
 *
 * @param {Date}date
 *            system date to convert.
 * @param {Object}[options]
 *            options to use
 *
 * @returns {Array} [ year, month, date ]
 */
function Date_to_Myanmar(date, options) {
	// 前置處理。
	if (!library_namespace.is_Object(options))
		options = Object.create(null);

	// reckon the year of ((date))
	var year = Math.floor((date - Myanmar_Date.epoch)
			/ Myanmar_YEAR_LENGTH_VALUE),
	//
	year_data = Myanmar_Date.year_data(year, options),
	// days count from Tagu 1
	days = (date - year_data.Tagu_1st) / ONE_DAY_LENGTH_VALUE,
	// 30 > mean month days. So the true month may be month or month + 1.
	month = days / 30 | 0,
	// for notes
	weekday = options.notes && date.getDay(),
	//
	accumulated_days = Myanmar_month_days_count[year_data.watat];

	// Test next month, or should be this month.
	var Myanmar_date = days - accumulated_days[month + 1];
	if (Myanmar_date < 0)
		days -= accumulated_days[month];
	else
		days = Myanmar_date, month++;

	if (days < 0)
		if (month !== 0)
			throw 'Unknown error of ' + date.format('CE');
		else
			// month: 0 → -1
			// e.g., 654/3/23 CE
			// Early Tabaung: 30 days
			month--, days += 30;
	// month: month index, Tagu: 0
	// assert: now days >=0.

	// +1: index to ordinal.
	Myanmar_date = [ year, month + 1, ++days | 0 ];
	if (0 < (days %= 1))
		Myanmar_date.push(days);

	// Early Tabaung: 30 days
	var month_days = month < 0 ? 30
	//
	: accumulated_days[month + 1] - accumulated_days[month];

	/**
	 * calendar notes / 曆注<br />
	 * Myanmar Astrological Calendar Days
	 *
	 * notes: {Array} all notes with Myanmar language
	 *
	 * @see http://cool-emerald.blogspot.sg/2013/12/myanmar-astrological-calendar-days.html
	 */
	if (typeof weekday === 'number') {
		var notes = [],
		// 0–11, do not count First Waso.
		month_index = month,
		//
		tmp = ((date - Myanmar_Date.epoch)
				% Myanmar_YEAR_LENGTH_VALUE) / ONE_DAY_LENGTH_VALUE | 0;

		// at start or end of year.
		if (tmp < 2 || 359 < tmp) {
			var new_year_info = Myanmar_Date.new_year_Date(tmp < 2 ? year : year + 1, {
				detail : true
			});
			if (tmp < 2) {
				if (date - new_year_info.new_year === 0)
					// New year's day
					notes.push("နှစ်ဆန်းတစ်ရက် (New year's day)");
			} else {
				days = date - new_year_info.eve;
				if (days >= 0 && new_year_info.new_year - date >= 0) {
					days = days / ONE_DAY_LENGTH_VALUE | 0;
					tmp = (new_year_info.new_year - new_year_info.eve) / ONE_DAY_LENGTH_VALUE | 0;
					switch (days) {
					case 0:
						// Thingyan eve (akyo day)
						tmp = 'သင်္ကြန်အကြို (Thingyan eve)';
						break;

					case 1:
						// Thingyan start day. akya day. akya time:
						tmp = 'သင်္ကြန်အကျ (Thingyan start at ' + (new Date(new_year_info.start_time))
							.format({
								parser : 'CE',
								format : '%H:%M:%S'
							}) + ')';
						break;

					case tmp - 1:
						// Thingyan end day. atat day. atat time:
						tmp = 'သင်္ကြန်အတက် (Thingyan end at ' + (new Date(new_year_info.end_time))
							.format({
								parser : 'CE',
								format : '%H:%M:%S'
							}) + ')';
						break;

					default:
						// Thingyan akyat, days between akya day, atat day: akyat days
						tmp = 'သင်္ကြန်အကြတ် (Thingyan akyat)';
						break;
					}

					notes.push(tmp);
				}
			}
		}

		if (month_index < 0)
			// assert: month_index === -1 (Early Tabaung)
			month_index = 11;
		else if (year_data.watat && month > 3)
			// month after First Waso.
			month_index--;

		days = Myanmar_date[2];
		// full moon days, new moon days and waxing and waning 8 are sabbath days. The day before sabbath day is sabbath eve.
		if (days === 8 || days === 15 || days === 23 || days === month_days)
			// Sabbath
			notes.push('ဥပုသ်');
		else if (days === 7 || days === 14 || days === 22 || days === month_days - 1)
			// Sabbath Eve
			notes.push('အဖိတ်');

		// Yatyaza: ရက်ရာဇာ
		tmp = [ {
			3 : 1,
			4 : 2,
			5 : 1,
			6 : 2
		}, {
			3 : 2,
			4 : 1,
			5 : 2,
			6 : 1
		}, {
			0 : 2,
			1 : 2,
			2 : 1,
			4 : 1
		}, {
			0 : 1,
			2 : 2,
			3 : 3
		} ][month_index % 4][weekday];
		if (tmp)
			if (tmp === 3)
				// Yatyaza, Pyathada (afternoon) / Afternoon Pyathada
				notes.push('ရက်ရာဇာ', 'မွန်းလွဲပြဿဒါး');
			else
				// [ , 'Yatyaza', 'Pyathada' ]
				notes.push([ , 'ရက်ရာဇာ', 'ပြဿဒါး' ][tmp]);

		//for(month=0;month<12;month++){i=month===8?7:(((month+3)%12)*2)%7+1;console.log(month+':'+i);}
		if ((weekday - (month_index === 8 ? 7 : ((month_index + 3) % 12) * 2 + 1)) % 7 >= -1) {
			// Thamanyo
			tmp = 'သမားညို';
			if (month_index === 10 && weekday === 3)
				// (afternoon)
				tmp = 'မွန်းလွဲ' + tmp;
			notes.push(tmp);
		}

		// days: waxing or waning day, 1–14
		if ((days = Myanmar_date[2]) > 15)
			days -= 15;
		if (days === [ 8, 3, 7, 2, 4, 1, 5 ][weekday])
			// Amyeittasote
			notes.push('အမြိတ္တစုတ်');
		if (days === [ 1, 4, 8, 9, 6, 3, 7 ][weekday])
			// Warameittugyi
			notes.push('ဝါရမိတ္တုကြီး');
		if (days + weekday === 12)
			// Warameittunge
			notes.push('ဝါရမိတ္တုငယ်');
		if (days === [ 1, 4, 6, 9, 8, 7, 8 ][weekday])
			// Yatpote
			notes.push('ရက်ပုပ်');
		if ([ [ 1, 2 ], [ 6, 11 ], [ 6 ], [ 5 ], [ 3, 4, 6 ], [ 3, 7 ], [ 1 ] ][weekday].includes(days))
			// Thamaphyu
			notes.push('သမားဖြူ');
		if ([ [ 2, 19, 21 ], [ 1, 2, 4, 12, 18 ], [ 10 ], [ 9, 18 ], [ 2 ], [ 21 ], [ 17, 26 ] ][weekday].includes(Myanmar_date[2]))
			// Nagapor
			notes.push('နဂါးပေါ်');
		if (days % 2 === 0
		//
		&& days === (month_index % 2 ? month_index + 3 : month_index + 6) % 12)
			// Yatyotema
			notes.push('ရက်ယုတ်မာ');
		if (days - 1 === (((month_index + 9) % 12) / 2 | 0))
			// Mahayatkyan
			notes.push('မဟာရက်ကြမ်း');
		if (days === [ 8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4 ][month_index])
			// Shanyat
			notes.push('ရှမ်းရက်');
		// Nagahle
		// http://www.cool-emerald.com/2013/12/blog-post.html#nagahlem
		notes.push('နဂါးခေါင်းလှည့်: ' + nagahle_direction[((month_index + 1) % 12) / 3 | 0]);

		if (notes.length > 0)
			Myanmar_date.notes = notes;
	}

	if (options.format === 'serial') {

	} else if (options.locale === 'my') {
		// ↑ my: Myanmar language

		// Produce a Myanmar date string
		// @see https://6885131898aff4b870269af7dd32976d97cca04b.googledrive.com/host/0B7WW8_JrpDFXTHRHbUJkV0FBdFU/mc_main_e.js
		// function m2str(my, myt, mm, mmt, ms, d, wd)

		// CeL.numeral.to_Myanmar_numeral()
		var numeral = library_namespace.to_Myanmar_numeral || function(number) {
			return number;
		};
		// Myanmar year
		Myanmar_date[0] = 'မြန်မာနှစ် ' + numeral(year) + ' ခု၊ ';
		// month
		Myanmar_date[1] = accumulated_days.month[Myanmar_date[1]];
		// date
		days = Myanmar_date[2];
		Myanmar_date[2] = days < 15 ? 'လဆန်း ' + numeral(days) + ' ရက်'
		// The 15th of the waxing (လပြည့် [la̰bjḛ]) is the civil full moon day.
		: days === 15 ? 'လပြည့်'
		// The civil new moon day (လကွယ် [la̰ɡwɛ̀]) is the last day of the month (14th or 15th waning).
		: days >= 29 && days === month_days ? 'လကွယ်' : 'လဆုတ် ' + numeral(days - 15) + ' ရက်';
		// time
		if (options.time) {
			days = date.getHours();
			// hour
			Myanmar_date[4] = (days === 0 ? 'မွန်းတက် ၁၂ '
			: days === 12 ? 'မွန်းလွဲ ၁၂ '
			: days < 12 ? 'မနက် ' + numeral(h)
				: ((days -= 12) > 6 ? 'ည '
				: days > 3 ? 'ညနေ '
				// assert: 0 < days <= 3
				: 'နေ့လယ် '
				)+ numeral(h)
			) + 'နာရီ၊';
			// assert: Myanmar_date.length === 5
			// minute, second
			Myanmar_date.push(numeral(date.getMinutes()) + ' မိနစ်၊', numeral(date.getSeconds()) + ' စက္ကန့်');
		}
		// weekday
		Myanmar_date[3] = '၊ '
			+ [ 'တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး',
				'ကြာသပတေး', 'သောကြာ', 'စနေ' ][date.getDay()] + 'နေ့၊';

		// Myanmar_date = [ year, month, date, weekday, hour, minute, second ]
		// Using Myanmar_date.join(' ') to get full date name.

	} else {
		Myanmar_date[1] = accumulated_days.month.en[Myanmar_date[1]];
		days = Myanmar_date[2];
		Myanmar_date[2] = days < 15 ? 'waxing ' + days
		// The 15th of the waxing (လပြည့် [la̰bjḛ]) is the civil full moon day.
		: days === 15 ? 'full moon'
		// The civil new moon day (လကွယ် [la̰ɡwɛ̀]) is the last day of the month (14th or 15th waning).
		: days >= 29 && days === month_days ? 'new moon' : 'waning ' + (days - 15);
	}

	return Myanmar_date;
}

// west,north,east,south
var nagahle_direction = 'အနောက်,မြောက်,အရှေ့,တောင်'.split(',');


/*

// confirm
CeL.run('https://googledrive.com/host/0B7WW8_JrpDFXTHRHbUJkV0FBdFU/mc.js');

for(var y=-100;y<2000;y++){var d=chk_my(y);CeL.assert([d.myt,CeL.Myanmar_Date.year_data(y).watat],'t'+y);d=j2w(d.tg1,1);CeL.assert([d.y+'/'+d.m+'/'+d.d,CeL.Myanmar_Date(y).format('%Y/%m/%d')],y);}
// true


'654/3/23'.to_Date('CE').to_Myanmar()

CeL.Myanmar_Date.test(-2e4, 4e6, 4).join('\n') || 'OK';
// "OK"

*/
Myanmar_Date.test = new_tester(Date_to_Myanmar, Myanmar_Date, {
	epoch : Date.parse('638/3/22'),
	continued_month : function(month, old_month) {
		// month === 0: e.g., 654/3/23 CE
		// month === 2: e.g., Late Tagu / Late Kason → Kason
		return month <= 2 && 0 <= month
		// The old month is the last month of last year.
		&& 12 <= old_month && old_month <= 14;
	}
});

