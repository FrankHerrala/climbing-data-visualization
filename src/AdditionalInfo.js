import malefemale from './malefemale.png';
import './App.css';
import * as V from 'victory';
import { VictoryPie, VictoryLabel, VictoryTheme } from 'victory';
import JsonParser from "./JsonParser.js";
import GradesAndAscents from "./GradesAndAscents.js";
import React, { useState } from 'react';

function AdditionalInfo(props) {
    const malePercentage = ((props.info.males / (props.info.males + props.info.females))*100).toFixed(2);
    const femalePercentage = ((props.info.females / (props.info.males + props.info.females))*100).toFixed(2);
    const methods = parseMethodData();
    const experience = parseExperience();

    function parseMethodData() {
        return([
            {x: 1, y: props.info.redpoints, label: "Redpoint"},
            {x: 2, y: props.info.onsights, label: "Onsight"},
            {x: 3, y: props.info.flashes, label: "Flash"},
            {x: 4, y: props.info.topropes, label: "Toprope"},
        ])
    }
    function parseExperience() {
        return([
            {x: 1, y: props.info.experience.filter( x => x<=2).length, label: "0-2"},
            {x: 2, y: props.info.experience.filter( x=> x>2 && x<=4).length, label: "2-4"},
            {x: 3, y: props.info.experience.filter( x=> x>4 && x<=6).length, label: "4-6"},
            {x: 4, y: props.info.experience.filter( x=> x>6 && x<=8).length, label: "6-8"},
            {x: 5, y: props.info.experience.filter( x=> x>8 && x<=10).length, label: "8-10"},
            {x: 6, y: props.info.experience.filter( x=> x>10).length, label: "+10"}
        ])
    }
    return (
        
        <div className="AdditionalInfo">
            <p id="Grade">{props.grade}</p>
            <div className="GenderDistribution">
                <p>{malePercentage}%</p>
                <img src={malefemale} alt="malefemale" width="40" height="40"></img>
                <p>{femalePercentage}%</p>
            </div>
            <div className="PieChart">
                <p>Ascent method:</p>
                <svg viewBox="0 0 400 400"> 
                <VictoryPie
                    width={440}
                    standalone={false}
                    theme={VictoryTheme.material}
                    colorScale="warm"
                    animate={{
                        duration: 1000
                    }}
                    data={methods}
                    labelRadius={({datum}) => (datum.x*9+120)}
                    labelPlacement="function"
                    labelComponent={
                        <VictoryLabel
                          style={[
                            {fontSize: 16}
                          ]}
                        />}
                />
                </svg>
            </div>
            <div className="PieChart">
                <p>Experience in years:</p>
                <svg viewBox="0 0 400 400">
                <VictoryPie
                    width={440}
                    standalone={false}
                    theme={VictoryTheme.material}
                    colorScale="warm"
                    animate={{
                        duration: 1000
                    }}
                    data={experience}
                    labelPlacement="function"
                    labelRadius={({datum}) => (datum.x*9+120)}
                    labelComponent={
                        <VictoryLabel
                          style={[
                            {fontSize: 16}
                          ]}
                        />}
                />
                </svg>
            </div>
        </div>
    );
}

export default AdditionalInfo;