//externals
// import ReactDOM from 'react-dom';
import React from 'react';


// OPENLAYERS
import 'ol/ol.css';
// import ol from 'ol'
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import LayerVector from 'ol/layer/Vector'
import SourceVector from 'ol/source/Vector'
import OSM from 'ol/source/OSM';
import Wktformat from 'ol/format/WKT'
import GeomPoint from 'ol/geom/Point'

class OpenLayerMap extends React.Component {

    componentDidMount() {

        // create feature layer and vector source
        var featuresLayer = new LayerVector({
            source: new SourceVector({
                features: []
            })
        });

        // create map object with feature layer
        var map = new Map({
            target: this.refs.mapContainer,
            layers: [
                //default OSM layer
                new TileLayer({
                    source: new OSM()
                }),
                featuresLayer
            ],
            view: new View({
                center: [-11718716.28195593, 4869217.172379018], //Boulder
                zoom: 13,
            })
        });

        map.on('click', this.handleMapClick.bind(this));

        // save map and layer references to local state
        this.setState({
            map: map,
            featuresLayer: featuresLayer
        });

    }

    // pass new features from props into the OpenLayers layer object
    componentDidUpdate(prevProps, prevState) {
        this.state.featuresLayer.setSource(
            new SourceVector({
                features: this.props.routes
            })
        );
    }

    handleMapClick(event) {

        // create WKT writer
        var wktWriter = new Wktformat();

        // derive map coordinate (references map from Wrapper Component state)
        var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

        // create Point geometry from clicked coordinate
        var clickedPointGeom = new GeomPoint(clickedCoordinate);

        // write Point geometry to WKT with wktWriter
        var clickedPointWkt = wktWriter.writeGeometry(clickedPointGeom);

        // place Flux Action call to notify Store map coordinate was clicked
        // Actions.setRoutingCoord(clickedPointWkt); ?? what is actions ??
        console.log(clickedPointWkt);

    }

    render() {
        return (
            <div ref="mapContainer"> </div>
        );
    }

}

export default OpenLayerMap;