import './App.css';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import React, { useState, useEffect } from 'react';


function GradesAndAscents(props) {
    const [externalMutations, setExternalMutations] = useState(undefined);

    function handleClick(e) {

        props.setSelectedGrade(e.target.getAttribute("index"))
        return({
            target: "data",
            mutation: () => ({})
        });
    }
    function handleLabelClick(e) {

        var index = 0;
        props.data[0].map( item => {
            if (item.ascents === parseInt(e.target.innerHTML)){
                props.setSelectedGrade(index);
            }else{
                index += 1;
            }
        })
        
        return({
            target: "data",
            mutation: () => ({})
        });
    }
    function handleEnter() {
        return({
            target: "data",
            mutation: (props) => ({ style: { fill: "orange", stroke: props.style === undefined ? "red" : props.style.stroke , strokeWidth: props.style=== undefined ? 0 : props.style.strokeWidth } })
        });
    }
    function handleLeave() {
        return({
            target: "data",
            mutation: (props) => ({ style: { fill: "grey", stroke: props.style === undefined ? "red" : props.style.stroke , strokeWidth: props.style === undefined ? 0 : props.style.strokeWidth } })
        })
    }
    return (
        <div>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                height={300}
                width={500}
                externalEventMutations={externalMutations}
                events={[
                    {
                        target: "data",
                        childName: "Bar",
                        eventHandlers: {
                        onClick: (e) => (handleClick(e)),
                        onMouseEnter: () => (handleEnter()),
                        onMouseLeave: () => (handleLeave())
                        }
                    },{
                        target: "labels",
                        childName: "Bar",
                        eventHandlers: {
                        onClick: (e) => (handleLabelClick(e)),
                        onMouseEnter: () => (handleEnter()),
                        onMouseLeave: () => (handleLeave())
                        }
                    }
                ]}
            >
            <VictoryAxis
                tickFormat={ (x) => (x)}
                label="Grade"
                style={{
                    tickLabels: {fontSize: 8, padding: 2},
                    axisLabel: {padding: 30}
                }}
            />
            <VictoryAxis
                dependentAxis
                tickFormat={ (x) => (`${x / 1000}k`)}
                label="Ascents"
                style={{
                    tickLabels: {fontSize: 10, padding: 2},
                    axisLabel: {padding: 20}
                }}
            />
                <VictoryBar
                    name="Bar"
                    horizontal
                    animate={{
                        duration: 1000,
                        easing:"circleIn"
                    }}
                    data={props.data[0]}
                    labels={({ datum }) => datum.ascents}
                    style={{ data: { fill: "grey"} }}
                    labelComponent={
                        <VictoryLabel
                          style={[
                            {fontSize: 8}
                          ]}
                        />}
                    x="grade"
                    y="ascents"
                />
            </VictoryChart>
        </div>
    );
}

export default GradesAndAscents;
