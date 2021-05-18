import test from './climb_ascent_rope2013test.json';
import climbing_grades from './climb_grades.json';


function JsonParser(climbing_data){
    const grade_data = JSON.parse(JSON.stringify(climbing_grades));
    let grades = {};
    grade_data.rows.map( item  => {
        grades[item[0].toString()] = item[5]
    })
    var data = JSON.parse(climbing_data.replace(/'/g, '"'));
    var viz_data = [];
    var additionalData = [];
    var underGradeFour = {
        "ascents": 0,
        "redpoints": 0,
        "flashes": 0,
        "onsights": 0,
        "topropes": 0,
        "males": 0,
        "females": 0,
        "experience": []
    };
    var gradeFive = {
        "ascents": 0,
        "redpoints": 0,
        "flashes": 0,
        "onsights": 0,
        "topropes": 0,
        "males": 0,
        "females": 0,
        "experience": []
    };
    for (var key of Object.keys(data)) {
        if ( data[key].ascents != 0){
            if( parseInt(key) < 28){
                underGradeFour.ascents = underGradeFour.ascents + data[key].ascents;
                underGradeFour.redpoints = underGradeFour.redpoints + data[key].redpoints;
                underGradeFour.flashes = underGradeFour.flashes + data[key].flashes;
                underGradeFour.onsights = underGradeFour.onsights + data[key].onsights;
                underGradeFour.topropes = underGradeFour.topropes + data[key].topropes;
                underGradeFour.males = underGradeFour.males + data[key].males;
                underGradeFour.females = underGradeFour.females + data[key].females;
                underGradeFour.experience = underGradeFour.experience.concat(data[key].experience);
                
            }else if( parseInt(key) >= 28 && parseInt(key) < 35){
                gradeFive.ascents = gradeFive.ascents + data[key].ascents;
                gradeFive.redpoints = gradeFive.redpoints + data[key].redpoints;
                gradeFive.flashes = gradeFive.flashes + data[key].flashes;
                gradeFive.onsights = gradeFive.onsights + data[key].onsights;
                gradeFive.topropes = gradeFive.topropes + data[key].topropes;
                gradeFive.males = gradeFive.males + data[key].males;
                gradeFive.females = gradeFive.females + data[key].females;
                gradeFive.experience = gradeFive.experience.concat(data[key].experience);
            }else{
                viz_data.push({"grade": grades[key], "ascents": data[key].ascents})
                additionalData.push({"redpoints": data[key].redpoints,
                "flashes": data[key].flashes,
                "onsights": data[key].onsights,
                "topropes": data[key].topropes,
                "males": data[key].males,
                "females": data[key].females,
                "experience": data[key].experience})
            }
        }
    }
    viz_data.unshift({"grade": "max 4", "ascents": underGradeFour.ascents}, {"grade": "5", "ascents": gradeFive.ascents})
    additionalData.unshift({"redpoints": underGradeFour.redpoints,
                "flashes": underGradeFour.flashes,
                "onsights": underGradeFour.onsights,
                "topropes": underGradeFour.topropes,
                "males": underGradeFour.males,
                "females": underGradeFour.females,
                "experience": underGradeFour.experience},
                {"redpoints": gradeFive.redpoints,
                "flashes": gradeFive.flashes,
                "onsights": gradeFive.onsights,
                "topropes": gradeFive.topropes,
                "males": gradeFive.males,
                "females": gradeFive.females,
                "experience": gradeFive.experience}
                )
    return([viz_data, additionalData]);
};

export default JsonParser;