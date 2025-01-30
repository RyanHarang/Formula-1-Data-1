class Driver{
    constructor(id, name, picture, age, number, team, races, wins){
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.age = age;
        this.number = number;
        this.team = team;
        this.totalRaces = races;
        this.wins = wins;
    }
}

function get_sample_data(){
    let drivers = [];

    piastriPicture = "https://pitwall.app/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6Mjc2LCJwdXIiOiJibG9iX2lkIn19--882bfb095f33018657bc998fa24cf9988fec1a9f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJncmF2aXR5IjoiTm9ydGgiLCJjcm9wIjoiKzArMCIsInJlc2l6ZSI6Il4ifSwicHVyIjoidmFyaWF0aW9uIn19--39785568597c35f71fab35df7cd0ff5768823778/2024_piastri.jpg"
    russellPicture = "https://pitwall.app/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTQ3LCJwdXIiOiJibG9iX2lkIn19--945cf40e9f9b3feef755402238eb71eb5a3d273a/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJqcGciLCJncmF2aXR5IjoiTm9ydGhXZXN0IiwiY3JvcCI6IjExOTEuODU4NDc5NjEyMDV4MTE5MS44NTg0Nzk2MTIwNSsyMTEuNDY3NDc3MTc1OTY3KzAuMCIsInJlc2l6ZSI6IjExOTEuODU4NDc5NjEyMDV4MTE5MS44NTg0Nzk2MTIwNV4ifSwicHVyIjoidmFyaWF0aW9uIn19--eac55411b62db834becd7ff18d3e161e86b70b9b/2019_russell_barcelona_preseason_test.jpg"
    hamiltonPicture = "https://pitwall.app/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTMxLCJwdXIiOiJibG9iX2lkIn19--5c7dc267ca83c67b0e50e1bff60f5bbc3d176a8d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJqcGciLCJncmF2aXR5IjoiTm9ydGhXZXN0IiwiY3JvcCI6IjEwNDIuMTIzNTExMzI4MDJ4MTA0Mi4xMjM1MTEzMjgwMisxMjE4LjY3MTcyMDg4ODYyKzQ2NS4xMDcwNDM3MDgzODQiLCJyZXNpemUiOiIxMDQyLjEyMzUxMTMyODAyeDEwNDIuMTIzNTExMzI4MDJeIn0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--4b8e5d4dce7028eb4a2d270580d031fa0e1ca4b5/2018_hamilton_silverstone.jpg"
    
    let piastri = new Driver(1, "Oscar Piastri", piastriPicture, 23, 81, "McLaren Racing", 46, 2);
    let hamilton = new Driver(2, "Lewis Hamilton", hamiltonPicture, 40, 44, "Mercedes-AMG", 356, 105);
    let russell = new Driver(3, "George Russell", russellPicture, 26, 63, "Mercedes-AMG", 128, 3);
    drivers.push(piastri, hamilton, russell);
    return drivers;
}