import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Certificate } from "../../../service";
import "./index.css";
import { toast } from "react-toastify";

const IndieCertificate = () => {
  const { certificateUid } = useParams();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [certificateData, setCertificateData] = useState({});

  const fetchCertificateData = async () => {
    const res = await Certificate.indieCertificate({ certificateUid });

    if (res.status === 200) {
      if (res.data.success) {
        await setCertificateData(res.data.certificateData);
        setIsDataLoaded(true);
      } else {
        toast.error("Certificate Not Found!");
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCertificateData();
  }, []);

  return (
    <div className={"MainCon"}>
      <div className="card certiCard">
        {isDataLoaded ? (
          <div className="card-body">
            <div className="inner">
              <div className={"validCon"}>Valid Certificate</div>
              <div
                style={{
                  fontSize: "18px",
                  letterSpacing: ".5px",
                  marginBottom: "10px",
                }}
              >
                <img
                  style={{ height: "15vh" }}
                  src={certificateData.pledgePreview}
                  alt={"SupporterLogo"}
                />
              </div>

              <div
                style={{
                  fontSize: "18px",
                  letterSpacing: ".5px",
                  marginTop: "15px",
                }}
              >
                {certificateData.pledgeName}
                <span className="color__gray" style={{ marginTop: "5px" }}>
                  Issued to: {certificateData.userName}
                </span>
                <span className="color__gray" style={{ marginTop: "5px" }}>
                  Issued On:{" "}
                  {new Date(certificateData.issuedDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body">
            <div className="inner">
              <div className={"validCon invalidCon"}>Invalid Certificate</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndieCertificate;
