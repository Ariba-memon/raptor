import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Card,
  CardBody,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "@styles/react/libs/react-select/_react-select.scss";

// Mapbox access token
const mapboxAccessToken = process.env.REACT_APP_MAP_ACCESSKEY;

const ScooterMap = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [zonesEnabled, setZonesEnabled] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState(null);
  const navigate = useNavigate();

  // Dummy scooter data
  const scooters = [
    {
      id: "T12354",
      longitude: 24.7536,
      latitude: 59.437,
      charge: "100%",
      status: "available",
    },
    {
      id: "T12355",
      longitude: 24.745,
      latitude: 59.431,
      charge: "90%",
      status: "available",
    },
    {
      id: "T12356",
      longitude: 24.748,
      latitude: 59.433,
      charge: "75%",
      status: "available",
    },
    {
      id: "T12357",
      longitude: 24.74,
      latitude: 59.439,
      charge: "60%",
      status: "available",
    },
    {
      id: "T12358",
      longitude: 24.76,
      latitude: 59.43,
      charge: "50%",
      status: "available",
    },
  ];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setModalOpen(false);
  };

  const toggleZones = () => {
    setZonesEnabled(!zonesEnabled);
  };

  const handleDetailClick = (scooter) => {
    navigate(`/scooter/${scooter.id}`);
  };

  const zoneLayerStyle = {
    id: "zone-layer",
    type: "fill",
    paint: {
      "fill-color": "#ff0000", // Red color for the zone
      "fill-opacity": 0.3,
    },
  };

  // Define zone data for the Source with a hole in the middle
  const zonesGeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            // Outer polygon (larger zone boundary)
            [
              [24.70, 59.42],
              [24.80, 59.42],
              [24.80, 59.45],
              [24.70, 59.45],
              [24.70, 59.42],
            ],
            // Inner polygon (hole in the center)
            [
              [24.74, 59.43],
              [24.76, 59.43],
              [24.76, 59.44],
              [24.74, 59.44],
              [24.74, 59.43],
            ],
          ],
        },
      },
    ],
  };

  return (
    <div>
      {/* City Selection Modal */}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Select City
        </ModalHeader>
        <ModalBody>
          {[
            "Khmelnytskyi",
            "Tallinn",
            "Asturias",
            "Österreich",
            "Valencia",
          ].map((city) => (
            <div key={city} className="mb-2">
              <Button color="primary" onClick={() => handleCitySelect(city)}>
                {city}
              </Button>
            </div>
          ))}
        </ModalBody>
      </Modal>

      {/* Map Card */}
      <Card className="mt-4">
        <CardBody>
          <div className="d-flex justify-content-between mb-3">
            <Input
              type="text"
              placeholder="Search..."
              style={{ width: "200px" }}
            />
            <FormGroup check>
              <Label check>
                <Input
                  type="switch"
                  id="zoneSwitch"
                  checked={zonesEnabled}
                  onChange={toggleZones}
                />
                <span className="ml-2">
                  {zonesEnabled ? "Disable Zones" : "Enable Zones"}
                </span>
              </Label>
            </FormGroup>
          </div>

          <Map
            initialViewState={{
              longitude: 24.7536,
              latitude: 59.437,
              zoom: 12,
            }}
            style={{ height: "400px", width: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={mapboxAccessToken}
            attributionControl={false}
          >
            {/* Display scooters as markers */}
            {scooters.map((scooter) => (
              <Marker
                key={scooter.id}
                longitude={scooter.longitude}
                latitude={scooter.latitude}
                anchor="bottom"
              >
                <img
                  src="https://icons.veryicon.com/png/o/education-technology/smart-appliances/electric-scooter.png"
                  alt="Scooter"
                  style={{ width: "45px", height: "45px", cursor: "pointer" }}
                  onClick={() => setSelectedScooter(scooter)}
                />
              </Marker>
            ))}

            {/* Show popup when a scooter is selected */}
            {selectedScooter && (
              <Popup
                longitude={selectedScooter.longitude}
                latitude={selectedScooter.latitude}
                anchor="top"
                onClose={() => setSelectedScooter(null)}
              >
                <div>
                  <h6>Details</h6>
                  <p>Number: {selectedScooter.id}</p>
                  <p>Real charge: {selectedScooter.charge}</p>
                  <p>Status: {selectedScooter.status}</p>
                  <Button
                    color="primary"
                    onClick={() => handleDetailClick(selectedScooter)}
                  >
                    Detail
                  </Button>
                </div>
              </Popup>
            )}

            {/* Toggle zone layer */}
            {zonesEnabled && (
              <Source type="geojson" data={zonesGeoJSON}>
                <Layer {...zoneLayerStyle} />
              </Source>
            )}
          </Map>
        </CardBody>
      </Card>

      <Button
        color="primary"
        onClick={() => setModalOpen(true)}
        className="mt-3"
      >
        Open City Selection
      </Button>
    </div>
  );
};

export default ScooterMap;
