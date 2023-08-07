import React, { useEffect, useState } from "react";
import { Index } from "../../service";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import CtaBtn from "../Original/CtaBtn";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

import VirtualizedSelect from "react-virtualized-select";

import { Country, State, City } from "country-state-city";

const ProfileAddress = ({ fUserData }) => {
  const [formData, setFormData] = useState(fUserData);

  const [btnClick, setBtnClick] = useState(false);

  const saveNewDetails = async (newUserDel) => {
    setBtnClick(true);

    const res = await Index.saveDel({ newUserDel, type: "Address" });

    if (res.status === 200) {
      toast.success("Details Updated");
    } else {
      toast.error(res.data);
    }

    setBtnClick(false);
  };

  const [countriesOption, setCountriesOption] = useState([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();

    let co = [];
    allCountries.map((country) => {
      co.push({ label: country.name, value: country.isoCode });
    });

    setCountriesOption(co);
  }, []);

  const [statesOption, setStatesOption] = useState([]);

  useEffect(() => {
    if (formData.country) {
      const allStates = State.getStatesOfCountry(formData.country);

      let st = [];
      allStates.map((state) => {
        st.push({ label: state.name, value: state.isoCode });
      });
      setStatesOption(st);
    }
  }, [formData.country]);

  const [citiesOption, setCitiesOption] = useState([]);

  useEffect(() => {
    if (formData.state) {
      const allCities = City.getCitiesOfState(formData.country, formData.state);

      let ct = [];
      allCities.map((city) => {
        ct.push({ label: city.name, value: city.name });
      });
      setCitiesOption(ct);
    }
  }, [formData.state]);

  return (
    <div className={"personalCon"}>
      <p>Where are you from</p>

      <div className={"proRow"}>
        <div className="genSelector">
          <VirtualizedSelect
            options={countriesOption}
            placeholder={"Select Country"}
            onChange={(selectValue) =>
              setFormData((curr) => {
                return {
                  ...curr,
                  country: selectValue ? selectValue.value : null,
                };
              })
            }
            value={formData.country}
          />
        </div>

        <div className="genSelector">
          <VirtualizedSelect
            options={statesOption}
            placeholder={"Select State"}
            onChange={(selectValue) =>
              setFormData((curr) => {
                return {
                  ...curr,
                  state: selectValue ? selectValue.value : null,
                };
              })
            }
            value={formData.state}
          />
        </div>
      </div>

      <div className={"proRow"}>
        <div className="genSelector">
          <VirtualizedSelect
            options={citiesOption}
            placeholder={"Select City"}
            onChange={(selectValue) =>
              setFormData((curr) => {
                return {
                  ...curr,
                  city: selectValue ? selectValue.value : null,
                };
              })
            }
            value={formData.city}
          />
        </div>

        <div className="delText">
          <input
            type="number"
            placeholder={"Zip Code"}
            value={formData.zipCode}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, zipCode: e.target.value };
              });
            }}
          />
        </div>
      </div>

      <div className={"proRow"}>
        <div className="delText">
          <input
            type="text"
            placeholder={"Address Line 1"}
            value={formData.line1}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, line1: e.target.value };
              });
            }}
          />
        </div>
        <div className="delText">
          <input
            type="text"
            placeholder={"Address Line 2"}
            value={formData.line2}
            onChange={(e) => {
              setFormData((curr) => {
                return { ...curr, line2: e.target.value };
              });
            }}
          />
        </div>
      </div>

      {btnClick ? (
        <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60", "#FF5A60"]}
        />
      ) : (
        <CtaBtn
          Text={"Save"}
          fontSize={14}
          onClick={() => saveNewDetails(formData)}
        />
      )}
    </div>
  );
};

export default ProfileAddress;
