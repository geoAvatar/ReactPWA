// REACT
import React, { Component } from 'react';

// CSS
import './OpenLayerMap.css'

// OPENLAYERS
import 'ol/ol.css';
// import ol from 'ol'
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileVector from 'ol/layer/Vector'
import SourceVector from 'ol/source/Vector'
import OSM from 'ol/source/OSM';

class OpenLayerMap extends Component{

    render() {
        return (
            <div ref="map"> </div>
        );
    }

    componentDidMount() {
        // create feature layer and vector source
        var featuresLayer = new TileVector({
            source: new SourceVector({
                features: [],
            })
        });

        // create map object with feature layer
        var map = new Map({
            target: this.refs.map,
            layers: [
                //default OSM layer
                new TileLayer({
                    source: new OSM()
                }),
                featuresLayer
            ],
            view: new View({
                center: [0, 0], 
                zoom: 1,
            })
        });

        // save map and layer references to local state
        this.setState({
            map: map,
            featuresLayer: featuresLayer
        });
    }
}

export default OpenLayerMap