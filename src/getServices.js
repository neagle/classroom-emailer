const getServices = tsv => {
  const arr = tsv.split("\n").map(row => row.split("\t"));
  const datesArr = arr.splice(3);
  const services = arr[2]
    .map((service, i) => {
      const looksLikeAService = /\w/;
      if (looksLikeAService.test(service)) {
        const dates = datesArr
          .map(row => {
            const day = row[i];
            const isDate = /\d{1,2}\/\d{1,2}/;

            if (isDate.test(day)) {
              const family = row[i + 1];
              return [day.trim(), family.trim()];
            }
          })
          .filter(Boolean);
        return {
          service: service.trim(),
          dates
        };
      }
    })
    .filter(Boolean);

  return services;
};

export default getServices;
