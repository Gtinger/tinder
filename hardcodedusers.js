class person {
    constructor(firstname, surname, birthplace, goals, interst, favquote, occupation, story, orientation,gender,dateOfBirth){
        this.firstname = firstname
        this.surname = surname
        this.birthplace = birthplace
        this.goals = goals
        this.interst = interst
        this.favquote = favquote
        this.occupation = occupation
        this.story = story
        this.orientation = orientation
        this.gender = gender
        this.dateOfBirth = dateOfBirth
    console.log(this);
    }
    calculateAge(){ 
        var msBetweenDOBAnd1970 = new Date(this.dateOfBirth);
        var msBetweenNowAnd1970 = Date.now();
        var ageMs = msBetweenNowAnd1970 - msBetweenDOBAnd1970;
        var ms = ageMs;
        var year = 1000*60*60*24*365;
        //var second = 1000;
        //var minute = second*60;
        //var hour = minute*60;
        //var day = hour*24;
        //var month = day*30;
        //var year = day*365.25;
        var years = Math.round(ms/year);
        console.log(years);
        }
        
}


var vivian = new person('Vivian','Jensen','Copenhagen','rich',['skydiving','trading options', 'feeding cows'],'Stonks only go up','astronaut',`Single mother with 18 kids and a mortage the size of Mars, if you can't handle me at my worst, you don't deserve me at my best `,'straight','female',('May 25, 1995'));

var lotte = new person('lotte','lottesen',true,'blue','denim',null,'F1 driver','fast',3,('December 17, 1999'));


lotte.calculateAge();
henrik.calculateAge();

var newLotte = JSON.stringify(lotte);
function myFunction() {
   document.getElementById("demo").innerHTML = newLotte;
 }
 console.log(calculateAge(henrik))