import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Certificate } from "../../../service";
import "./index.css";
import { toast } from "react-toastify";
import CtaBtn from "../../../Components/Original/CtaBtn";
import { MutatingDots } from "react-loader-spinner";

const IndieCertificate = () => {
  const navigate = useNavigate();
  const { certificateUid } = useParams();

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [valid, setValid] = useState(false);
  const [certificateData, setCertificateData] = useState({});

  const fetchCertificateData = async () => {
    const res = await Certificate.indieCertificate({ certificateUid });

    if (res.status === 200) {
      if (res.data.success) {
        setValid(true);
        await setCertificateData(res.data.certificateData);
      } else {
        toast.error("Certificate Not Found!");
      }
      setIsDataLoaded(true);
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCertificateData();
  }, []);

  return (
    <div className={"MainCon"}>
      {isDataLoaded ? (
        <div className="card certiCard">
          {valid ? (
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

          <CtaBtn Text={"Go to Home"} onClick={() => navigate("/")} />
        </div>
      ) : (
        <div className={"loadingCon"}>
          <MutatingDots
            height="100"
            width="100"
            color="#FF5A60"
            secondaryColor="#FF5A60"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <p>Fetching Certificate Data, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default IndieCertificate;
