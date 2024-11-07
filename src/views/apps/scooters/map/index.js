import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Card,
  CardBody,
  Progress,
  Label,
  Input,
} from "reactstrap";
import Map, { Marker, Source, Layer } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGetScooterLocations } from "../../../../api/query";

// Mapbox access token
const mapboxAccessToken = process.env.REACT_APP_MAP_ACCESSKEY;

const ScooterMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [zonesEnabled, setZonesEnabled] = useState(false);
  const [batteryFilter, setBatteryFilter] = useState(50);
  const navigate = useNavigate();

  // API Handling
  const [allScootersLocations, setAllScooters] = useState([]);
  const { data: scooterLocations } = useGetScooterLocations();

  useEffect(() => {
    if (scooterLocations) {
      setAllScooters(scooterLocations);
    }
  }, [scooterLocations]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleDetailClick = (scooter) => {
    setSelectedScooter(scooter);
    setModalOpen(true);
  };

  const toggleZones = () => setZonesEnabled(!zonesEnabled);

  const zoneLayerStyle = {
    id: "zone-layer",
    type: "fill",
    paint: {
      "fill-color": "#ff0000", // Red color for the zone
      "fill-opacity": 0.3,
    },
  };

  const getBatteryProgressColor = (batteryPercentage) => {
    if (batteryPercentage > 70) return "success";
    if (batteryPercentage > 30) return "warning";
    return "danger";
  };

  return (
    <div>
      <div className="mb-3 mt-2">
        <Label for="zoneSwitch" className="me-2">
          Enable Zones
        </Label>
        <Input
          type="switch"
          id="zoneSwitch"
          checked={zonesEnabled}
          onChange={toggleZones}
        />
      </div>

      <Map
        initialViewState={{
          longitude: 119.987148,
          latitude: 30.279434,
          zoom: 12,
        }}
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxAccessToken}
        attributionControl={false} // Hides the Mapbox attribution
      >
        {allScootersLocations?.map(
          (scooter) =>
            scooter.location.latitude !== "N/A" &&
            scooter.location.longitude !== "N/A" && (
              <Marker
                key={scooter._id}
                longitude={scooter.location.longitude}
                latitude={scooter.location.latitude}
              >
                <div
                  onClick={() => handleDetailClick(scooter)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHYJl2BfhjyJvQekbotQRm21HRt6GGmltlKg&s"
                    alt="Scooter"
                    style={{ width: "45px", height: "45px", cursor: "pointer" }}
                  />
                </div>
              </Marker>
            )
        )}

        {zonesEnabled && (
          <Source
            id="zone-data"
            type="geojson"
            data={{
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [119.97, 30.27], // Example polygon coordinates
                    [119.98, 30.28],
                    [120.0, 30.28],
                    [120.01, 30.27],
                    [119.97, 30.27],
                  ],
                ],
              },
            }}
          >
            <Layer {...zoneLayerStyle} />
          </Source>
        )}
      </Map>

      {selectedScooter && (
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>
            Scooter Details - {selectedScooter.imei}
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <h5>Status: {selectedScooter.status}</h5>
                {selectedScooter.vehicleHealth && (
                  <>
                    <p>Speed: {selectedScooter.vehicleHealth.speed} km/h</p>
                    <p>
                      Total Mileage: {selectedScooter.vehicleHealth.totalMile}{" "}
                      km
                    </p>
                    <p>
                      Remaining Mileage:{" "}
                      {selectedScooter.vehicleHealth.remainMile} km
                    </p>
                    <p>
                      Speed Limit: {selectedScooter.vehicleHealth.speedLimit}{" "}
                      km/h
                    </p>
                  </>
                )}

                <Button
                  onClick={() =>
                    navigate("/apps/scooter/devices/show", {
                      state: { id: selectedScooter?._id },
                    })
                  }
                >
                  View Full Details
                </Button>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default ScooterMap;
