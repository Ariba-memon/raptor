import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Row, Col } from "reactstrap";
import { useGetScooterById } from "../../../../api/query";
import { useLocation } from "react-router-dom";

const ScooterDevice = () => {
  const location = useLocation();
  const id = location?.state?.id;

  // State to store scooter data
  const [scooter, setScooter] = useState(null);

  // Fetch scooter data based on ID
  const { data: scooterData } = useGetScooterById(id);

  useEffect(() => {
    if (scooterData) {
      setScooter(scooterData);
    }
  }, [scooterData]);

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <CardBody>
          <CardTitle tag="h4" className="text-primary mb-4">
            Scooter Device Information
          </CardTitle>
          <Row>
            <Col md={6}>
              <CardText><strong>IMEI:</strong> {scooter?.imei || 'N/A'}</CardText>
              <CardText><strong>Status:</strong> {scooter?.status || 'N/A'}</CardText>
              <CardText><strong>Active:</strong> {scooter?.active ? "Yes" : "No"}</CardText>
              <CardText><strong>Battery Percentage:</strong> {scooter?.vehicleStatus?.batteryPercent || 'N/A'}%</CardText>
              <CardText><strong>Speed:</strong> {scooter?.vehicleStatus?.speed || 'N/A'} km/h</CardText>
              <CardText><strong>Total Mileage:</strong> {scooter?.vehicleStatus?.totalMile || 'N/A'} km</CardText>
            </Col>
            <Col md={6}>
              <CardText><strong>Longitude:</strong> {scooter?.location?.longitude || 'N/A'}</CardText>
              <CardText><strong>Latitude:</strong> {scooter?.location?.latitude || 'N/A'}</CardText>
              <CardText><strong>Altitude:</strong> {scooter?.location?.altitude || 'N/A'} meters</CardText>
              <CardText><strong>GPS Accuracy:</strong> {scooter?.location?.gpsAccuracy || 'N/A'}</CardText>
              <CardText><strong>Speed Limit:</strong> {scooter?.drivingConfiguration?.speedLimit || 'N/A'} km/h</CardText>
              <CardText><strong>Brake Force:</strong> {scooter?.drivingConfiguration?.brakeForce || 'N/A'}</CardText>
              <CardText><strong>Boost Level:</strong> {scooter?.drivingConfiguration?.boostLevel || 'N/A'}</CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default ScooterDevice;
