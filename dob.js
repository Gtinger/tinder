getAge = () => {

var birth_date = new Date(this.dob);

var birth_date_day = birth_date.getDate();
var birth_date_month = birth_date.getMonth()
var birth_date_year = birth_date.getFullYear();

var today_date = new Date();
var today_day = today_date.getDate();
var today_month = today_date.getMonth();
var today_year = today_date.getFullYear();

if (today_month > birth_date_month) {
    calculated_age = today_year - birth_date_year;
}
else if (today_month == birth_date_month) {
if (today_day >=  birth_date_day) {
    calculated_age = today_year - birth_date_year;
} else {
    calculated_age = today_year - birth_date_year -1 ;
}} else {
    calculated_age = today_year -birth_date_year -1;
}
return calculated_age;
};

module.exports = getAge();

//console.log(user)
