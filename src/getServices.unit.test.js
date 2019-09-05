const util = require("util");
const getServices = require("./getServices");

describe("correctly parses the sign-up tsv", () => {
  const tsv = `Please place your name in any open slot. If you are able, please choose a couple of slots in each category.

  Friday Laundry Pick Up			Wednesday Home-made Snack			Monday Drop Off Bouquet of Flowers and snacks
  Date	Family Volunteer		Date	Family Volunteer		Date	Family Volunteer
  9/6	Dabney Family		9/4	Eagle family		9/3	Eagle family
  9/13	Girard Family		9/11	Girard Family		9/9	Dabney Family
  9/20	Eagle family		9/18	Dabney Family		9/16	Girard Family
  9/26	Easley family		9/25	Meagher/Mataya		9/23	Eagle family
  10/4			10/2	Grosso Family		9/30	Meagher/Mataya
  10/11			10/9			10/7
  10/18			10/16	Kralovec family 		10/15
  10/25			10/23			10/21	Kralovec family
  11/1	Easley family		10/30			10/28
  11/8			11/6			11/4
  11/15	Grosso Family		11/13	Meagher/Mataya 		11/12	Meagher/Mataya
  12/6	Easley family		11/20			11/18	Grosso Family
  12/13			12/4			12/2
        12/11			12/9
        12/18			12/16	Kralovec family

  * Please note that some dates fall a day before or after due to a day off of school.`;

  const services = getServices(tsv);

  // console.log(JSON.stringify(services));

  it("get the correct number of services", () => {
    expect(services.length).toBe(3);
  });

  it("get the correct service name", () => {
    expect(services[0].service).toBe("Friday Laundry Pick Up");
  });

  it("get the correct number of dates", () => {
    expect(services[0].dates.length).toBe(15);
  });
});
