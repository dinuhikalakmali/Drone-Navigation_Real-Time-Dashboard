import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";

const Index = () => {
  const [assetId, setAssetId] = useState("");
  const [generated, setGenerated] = useState(false);
  const [type, setType] = useState("both"); // "qr", "barcode", "both"

  const qrRef = useRef(null);
  const barcodeRef = useRef(null);

  // Convert SVG to Image and download
  const downloadAsImage = (ref, filename, format = "png") => {
    if (!ref.current) return;
    const svg = ref.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const img = new Image();
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.download = `${filename}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
      URL.revokeObjectURL(url);
    };

    img.src = url;
    
  };

  // Print QR/Barcode
  const printCode = (ref) => {
    if (!ref.current) return;
    const svg = ref.current.querySelector("svg");
    if (!svg) return;

    const newWindow = window.open("", "_blank");
    const svgData = new XMLSerializer().serializeToString(svg);

    newWindow.document.write(`
      
      <html>
        <head>
          <title>Print</title>
        </head>
        <body style="text-align:center; margin-top:50px;">
          ${svgData}
          <script>
            window.onload = function() { window.print(); window.close(); };
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <Container fluid className="py-3">
      <PageBreadcrumb title="Inspection View " subtitle="inspec" />

      <Row className="justify-content-center mt-4">
        <Col sx={12}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body>
              <h4 className="mb-4 fw-semibold text-center"> Map View</h4>
              {/* Input Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Add Now User</Form.Label>
                <Col md={8} lg={6} className="p-0">
                  <Form.Control
                    type="text"
                    placeholder="Enter Name..."
                    value={assetId}
                    onChange={(e) => {
                      setAssetId(e.target.value);
                      setGenerated(false);
                    }}
                  />
                </Col>
              </Form.Group>

              {/* QR / Barcode Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Select Type</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="QA Engineer"
                    name="type"
                    type="radio"
                    id="qr"
                    value="qr"
                    checked={type === "qr"}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label="Site Engineer"
                    name="type"
                    type="radio"
                    id="barcode"
                    value="barcode"
                    checked={type === "barcode"}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label="Site Supervi"
                    name="type"
                    type="radio"
                    id="both"
                    value="both"
                    checked={type === "both"}
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </Form.Group>

              {/* Generate Button */}
              <div className="text-center">
                <Button
                  variant="primary"
                  disabled={!assetId.trim()}
                  onClick={() => setGenerated(true)}
                >
                  Generate
                </Button>
              </div>

              {/* Generated Codes */}
              {generated && (
                <div className="text-center mt-5">
                  <Row className="gy-4 justify-content-center">
                    {(type === "qr" || type === "both") && (
                      <Col md={6}>
                        <h6 className="fw-semibold text-muted mb-2">QR Code</h6>
                        <div
                          ref={qrRef}
                          className="d-inline-block p-3 bg-light rounded-3 border"
                        >
                          <QRCode
                            value={assetId}
                            size={180}
                            style={{ height: "auto", maxWidth: "100%" }}
                          />
                        </div>
                        <div className="mt-2 d-flex justify-content-center gap-2">
                          <Button
                            size="sm"
                            variant="outline-success"
                            onClick={() =>
                              downloadAsImage(qrRef, `QR_${assetId}`, "png")
                            }
                          >
                            Download PNG
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() =>
                              downloadAsImage(qrRef, `QR_${assetId}`, "jpeg")
                            }
                          >
                            Download JPEG
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => printCode(qrRef)}
                          >
                            Print
                          </Button>
                        </div>
                      </Col>
                    )}

                    {(type === "barcode" || type === "both") && (
                      <Col md={6}>
                        <h6 className="fw-semibold text-muted mb-2">Barcode</h6>
                        <div
                          ref={barcodeRef}
                          className="d-inline-block bg-light px-3 py-2 rounded-3 border"
                        >
                          <Barcode
                            value={assetId}
                            format="CODE128"
                            height={80}
                            width={2}
                            displayValue={true}
                            fontSize={14}
                          />
                        </div>
                        <div className="mt-2 d-flex justify-content-center gap-2">
                          <Button
                            size="sm"
                            variant="outline-success"
                            onClick={() =>
                              downloadAsImage(
                                barcodeRef,
                                `BAR_${assetId}`,
                                "png"
                              )
                            }
                          >
                            Download PNG
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() =>
                              downloadAsImage(
                                barcodeRef,
                                `BAR_${assetId}`,
                                "jpeg"
                              )
                            }
                          >
                            Download JPEG
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => printCode(barcodeRef)}
                          >
                            Print
                          </Button>
                        </div>
                      </Col>
                    )}
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
