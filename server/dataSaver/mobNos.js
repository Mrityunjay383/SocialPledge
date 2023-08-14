const reader = require("xlsx");
const Data = require("../model/data");
const mongoose = require("mongoose");

const readXlFile = async () => {
  await mongoose.connect(
    "mongodb+srv://admin-Mrityunjay:Mrityunjay%40@cluster0.bsyqp.mongodb.net/socialPledge",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const file = reader.readFile("./New.xlsx");
  const sheets = file.SheetNames;

  const mobNumsArr = [];

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[sheets[i]]);

    for (let j = 0; j < temp.length; j++) {
      mobNumsArr.push(
        temp[j].mob1,
        temp[j].mob2,
        temp[j].mob3,
        temp[j].mob4,
        temp[j].mob5,
        temp[j].mob6,
        temp[j].mob7
      );
    }

    console.log(`#202322614442748 mobNumsArr`, mobNumsArr);
    await Data.create({
      name: "New",
      numsArr: mobNumsArr,
    });
  }
};

readXlFile();
