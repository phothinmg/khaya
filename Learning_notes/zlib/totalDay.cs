
public Double Totaldays(int day, int month, int year, int Hour, int Min)
{

Double H1 = 0, M1 = 0;
Double Tim = 0;
Double Tot = 0, Dj = 0;

H1 = Convert.ToDouble(Hour);
M1 = Convert.ToDouble(Min);

Tim = (H1 + (M1 / 60));

Dj = julday(year, month, day, Tim, 1);
Dj -= 2415019.5;
TJd = Dj;
Tot = Dj + 1826554;
return Tot;
}