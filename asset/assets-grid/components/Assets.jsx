import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import { TbBasket } from "react-icons/tb";
import axios from "axios";

const API_BASE = "http://localhost/ASSET-API";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(`${API_BASE}/asset/all`);

        if (response.data.status && Array.isArray(response.data.data)) {
          const assetList = response.data.data;

          const assetsWithImages = await Promise.all(
            assetList.map(async (asset) => {
              try {
                const imgResponse = await axios.get(
                  `${API_BASE}/asset/image/${asset.asset_id}`
                );

                if (imgResponse.data?.status) {
                  asset.asset_image = imgResponse.data.data.asset_image;
                } else {
                  asset.asset_image = null;
                }
              } catch (error) {
                console.warn(`No image for ${asset.asset_id}`);
                asset.asset_image = null;
              }
              return asset;
            })
          );

          setAssets(assetsWithImages);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="text-center my-5 text-muted">
        <p>No reports found.</p>
      </div>
    );
  }

  return (
    <Row className="row-cols-xxl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
      {assets.map((asset) => {
        const imageSrc = asset.asset_image
          ? asset.asset_image.startsWith("data:image")
            ? asset.asset_image
            : `data:image/jpeg;base64,${asset.asset_image}`
          : null;

        return (
          <Col key={asset.asset_id}>
            <Card className="h-100 shadow-sm border-0">
              <CardBody className="pb-0 text-center">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    loading="lazy"
                    alt={asset.asset_name}
                    className="img-fluid rounded mb-3"
                  />
                ) : (
                  <div
                    className="bg-light d-flex align-items-center justify-content-center rounded mb-3"
                    style={{ height: 200 }}
                  >
                    <span className="text-muted small">No Image</span>
                  </div>
                )}

                <CardTitle className="fs-5 fw-semibold mb-2">
                  {asset.asset_name || "Unnamed Asset"}
                </CardTitle>

                <div className="text-muted small">
                  <div>Model: {asset.model || "—"}</div>
                  <div>Type: {asset.type || "—"}</div>
                  <div>Location: {asset.location || "—"}</div>
                </div>
              </CardBody>

              <CardFooter className="bg-transparent text-center">
                <Link
                  to={`/asset/view/${asset.asset_id}`}
                  className="btn btn-primary rounded-circle"
                >
                  <TbBasket className="fs-5 text-white" />
                </Link>
              </CardFooter>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Assets;
