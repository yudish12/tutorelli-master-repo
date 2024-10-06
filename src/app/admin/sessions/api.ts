export const getSelectDataApi = async () => {
  try {
    const res = await fetch("/api/admin/getSelectData");
    const resp = await res.json();
    return resp;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const createTutorApi = async (payload: any) => {
  const res = await fetch("/api/retool/tutor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const resp = await res.json();
  return resp;
};
