import { Col, Container, Row } from "react-bootstrap";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import SalesCharts from "@/views/dashboards/dashboard/components/SalesCharts";
import DashbordAssetsList from "./components/DashbordAssetList";
import StatCard from "./components/StatCard";
import { BsWrenchAdjustable } from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";
import AssetsCategory from "./components/AssetsCategory";

const Index = () => {
  const [totalAssets, setTotalAssets] = useState(0);
  const [activeAssets, setActiveAssets] = useState(0);
  const [inactiveAssets, setInactiveAssets] = useState(0);

  useEffect(() => {
    const fetchTotalAssetsCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost/ASSET-API/asset/all-count"
        );
        const total = response.data?.status ? response.data.count : 0;
        setTotalAssets(total);
        console.log("Total assets count fetched:", total);
      } catch (error) {
        console.error("Error fetching total assets count:", error);
      }
    };

    const fetchActiveAssetsCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost/ASSET-API/asset/active-count"
        );
        const active = response.data?.status ? response.data.count : 0;
        setActiveAssets(active);
        console.log("Active assets count fetched:", active);
      } catch (error) {
        console.error("Error fetching active assets count:", error);
      }
    };

    const fetchInactiveAssetCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost/ASSET-API/asset/inactive-count"
        );
        const inactive = response.data?.status ? response.data.count : 0;
        setInactiveAssets(inactive);
        console.log("Inactive assets count fetched:", inactive);
      } catch (error) {
        console.error("Error fetching inactive assets count:", error);
      }
    };

    fetchTotalAssetsCount();
    fetchActiveAssetsCount();
    fetchInactiveAssetCount();
  }, []);

  return (
    <Container fluid>
      <PageBreadcrumb title="Dashboard" />
      <Row>
        <Col xs={12} className="mb-4">
          <Row lg={3} md={2} sm={1} className="g-4">
            <Col>
              <StatCard
                item={{
                  title: "Total Defect Summary",
                  iconBg: "success", // Green
                  icon: BsWrenchAdjustable,
                  value: totalAssets, // Fixed to use correct state
                }}
              />
            </Col>
            <Col>
              <StatCard
                item={{
                  title: "Active Inspection Count",
                  iconBg: "info", // Cyan/Teal
                  icon: BsWrenchAdjustable,
                  value: activeAssets, // Fixed to use correct state
                }}
              />
            </Col>
            <Col>
              <StatCard
                item={{
                  title: "Site Coverage Statistics",
                  iconBg: "warning", // Yellow/Orange
                  icon: BsWrenchAdjustable,
                  value: 85, // Example value - replace with real data if available
                }}
              />
            </Col>
            <Col>
              <StatCard
                item={{
                  title: "Quality Score Display",
                  iconBg: "primary", // Blue
                  icon: BsWrenchAdjustable,
                  value: 92, // Example value - replace with real data if available
                }}
              />
            </Col>
            <Col>
              <StatCard
                item={{
                  title: "Recent Activity Feed",
                  iconBg: "danger", // Red
                  icon: BsWrenchAdjustable,
                  value: 12, // Example value - replace with real data if available
                }}
              />
            </Col>
            <Col>
              <StatCard
                item={{
                  title: "Critical Alerts Notifications",
                  iconBg: "secondary", // Gray/Purple-ish variant
                  icon: BsWrenchAdjustable,
                  value: 5, // Example value - replace with real data if available
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Optional Charts Section */}
      {/* <Row>
        <Col xs={12}>
          <SalesCharts />
        </Col>
      </Row> */}

      {/* <Row>
        <Col xs={12}>
          <AssetsCategory />
        </Col>
      </Row> */}

      <Row>
        <Col xs={12}>
          <DashbordAssetsList />
        </Col>
      </Row>
    </Container>
  );
};

export default Index;