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
// import { easeIn, easeOut } from 'ol/easing.js'

class OpenLayerMap extends React.Component {

    componentDidMount() {

        // create feature layer and vector source
        let featuresLayer = new LayerVector({
            source: new SourceVector({
                features: []
            })
        });
        let view = new View({
            center: [261427.6177675439, 6250705.351981059],
            zoom: 3
        })

        // create map object with feature layer
        let map = new Map({
            target: this.refs.mapContainer,
            layers: [
                //default OSM layer
                new TileLayer({
                    source: new OSM()
                }),
                featuresLayer
            ],
            view: view
        });

        map.on('click', this.handleMapClick.bind(this));

        // save map and layer references to local state
        this.setState({
            map: map,
            featuresLayer: featuresLayer,
            view:view
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
        const wktWriter = new Wktformat();

        // derive map coordinate (references map from Wrapper Component state)
        const clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

        // create Point geometry from clicked coordinate
        const clickedPointGeom = new GeomPoint(clickedCoordinate);

        // write Point geometry to WKT with wktWriter
        const clickedPointWkt = wktWriter.writeGeometry(clickedPointGeom);

        // place Flux Action call to notify Store map coordinate was clicked
        // Actions.setRoutingCoord(clickedPointWkt); ?? what is actions ??
        console.log(clickedPointWkt)
       
        
        console.log(this.state.map);
        this.state.view.animate({
                center: clickedCoordinate,
                duration: 500
            });
    }

    render() {
        return (
            <div>
                <h1 style={{'text-align':'center'}}>ReactMapping</h1>

                <div id='mapContainer'>
                    <div ref="mapContainer" > </div>
                </div>

            </div>
        );
    }

}

export default OpenLayerMap;