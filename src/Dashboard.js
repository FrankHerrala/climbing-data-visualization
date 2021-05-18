import logo from './logo.svg';
import './App.css';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import JsonParser from "./JsonParser.js";
import GradesAndAscents from "./GradesAndAscents.js";
import AdditionalInfo from "./AdditionalInfo.js";
import React, { useState } from 'react';

    
function importAll(r){
    let ascents = {};
    r.keys().map((item,index) => { ascents[item.replace('./', '')] = r(item);});
    return ascents
}

const ascentData = importAll(require.context('./resources', false, /\.json/));


const years = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2012,2013,2014,2015,2016]
var climbingData = {};
years.map( item => {
    const boulderKey = "boulders" + item;
    const ropeKey = "ropes" + item;
    climbingData[boulderKey] = JsonParser(ascentData["climb_ascent_boulder"+item+".json"])
    climbingData[ropeKey] = JsonParser(ascentData["climb_ascent_rope"+item+".json"])
})

function Dashboard() {
    const [vizData, setVizData] = useState(climbingData["boulders2016"]);
    const [selectedGrade, setSelectedGrade] = useState(undefined);
    const [externalMutations, setExternalMutations] = useState(undefined);
    const [climbType, setClimbType] = useState("boulders");
    const [year, setYear] = useState(2016);
    const [activeDataSet, setActiveDataSet] = useState(undefined);

    return (
        <div className="Dashboard">
            <div className="BarChartAndFilters">
                {climbType === "boulders"
                    ?<div className="Buttons">
                        <button id="SelectedButton" onClick={() => {setClimbType("boulders");setVizData(climbingData["boulders"+year])}}>Boulders</button>
                        <button onClick={() => {setClimbType("ropes");setVizData(climbingData["ropes"+year])}}>Rope routes</button>
                    </div>
                    :
                    <div className="Buttons">
                        <button onClick={() => {setClimbType("boulders");setVizData(climbingData["boulders"+year])}}>Boulders</button>
                        <button id="SelectedButton" onClick={() => {setClimbType("ropes");setVizData(climbingData["ropes"+year])}}>Rope routes</button>
                    </div>
                }

                <GradesAndAscents data={vizData} setSelectedGrade={ (index) => setSelectedGrade(index)}/>
                <div className="Buttons">
                    {years.map( item => {
                        return(year === item
                            ? <button id="SelectedButton" onClick={() => {setYear(item);setVizData(climbingData[climbType+item])}}>{item}</button>
                            : <button onClick={() => {setYear(item);setVizData(climbingData[climbType+item])}}>{item}</button>)
                    })}
                </div>
            </div>
            {selectedGrade === undefined
                ?<p>Select a grade</p>
                :<AdditionalInfo grade={vizData[0][selectedGrade].grade} info={vizData[1][selectedGrade]} />
            }
        </div>
    );
}

export default Dashboard;