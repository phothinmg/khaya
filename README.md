![cover](https://pub-d94f06e647584b8496cac0d43a6fecfb.r2.dev/images/KhayaCover.jpg)

#### ABOUT

**[Khaya - ခရာ](https://en.wikipedia.org/wiki/Burmese_calendar#:~:text=4%20seconds-,khaya,-%E1%80%81%E1%80%9B%E1%80%AC)** , one of the Burmese time unit , approximate equivalent to 400 milliseconds.

The package focus on Burmese Date and Time API and also some world time data. **esm only**

Khaya is base on  [@vvo/tzdb](https://github.com/vvo/tzdb) about time zones.

##### INSTALL 

```bash
npm i khaya
```

```bash
yarn add khaya
```


##### USAGE

**Namespace Khaya**

```javascript
import Khaya from "khaya";
```

**1. Gregorian to Julian Day Number**

```javascript
import Khaya from "khaya";
const jdn = Khaya.G2J(year: number,month: number,date : number,hour=12,minutes=0,seconds=0)
```

| Return |  Type  | 
|:------:|:------:|
| Julian Day Number   | number |        



**2. Julian Day Number(JDN) to  Gregorian**


```javascript
import Khaya from "khaya";
const jdn = Khaya.J2G(jdn: number)
```

|  Return |  Type  |
|:-------:|:------:|
| year    | number |
| month   | number |
| date    | number |
| hour    | number |
| minutes | number |
| seconds | number |
| weekday_num | number |
|  weekday_str | string |
|  month_str | string |

**3. Get World Time Data depend on time zone name**

[Check Time Zones List](https://github.com/phothinmg/khaya/wiki/Time-Zones-List-generated-by-@vvo-tzdb)  - example -  "Asia/Yangon"

```javascript
import Khaya from "khaya";
const getWorldTime = Khaya.WorldTime(timeZoneName: string)
```

|        Return       |    Type    |
|:-------------------:|:----------:|
| rawOffsetInMinutes  | number/any |
| rawOffsetInSeconds  |   number   |
| timestampInUtc      |   number   |
| timestampLocal      |   number   |
| localDateTime       |    Date    |
| dayNumberOfYear     |   number   |
| weekOfYear          |   number   |
| utcOffsetString     | string/any |
| localDateTimeString |   string   |
| utcDateTimeString   |   string   |


**4. Get Burmese Date**

```javascript
import Khaya from "khaya";
const getBurmeseDate = Khaya.GetBurmeseDate(date: string, lang: number)
```
Parameters 
  - date format - `YYYY-MM-DD`

  - lang - English = 1 , Burmese = 2, default = 2



|       Return      |    Type   |
|:-----------------:|:---------:|
| sasanaYear        |  string   |
| nameOfBurmeseYear |   string  |
| burmeseYear       |   string  |
| burmeseMonth      |   string  |
| burmeseDay        |   string  |
| burmeseWeekDay    |   string  |
| lunarPhase        |   string  |
| yatyarzar         |   string  |
| pyatthadar        |   string  |
| dragonHead        |   string  |
| sabbath           |   string  |
| astroDays         | string [ ] |
| maharbote         |   string  |
| nakhat            |   string  |
| warHtutType       |   string  |











