import axios from "axios";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

let promiseToaster = null;

export function notEkle(not) {
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  return { type: NOT_SIL, payload: notId };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  promiseToaster = toast.loading("Notunu aldık.");
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
        const newNote = JSON.parse(res.data.data);
        dispatch(notEkle(newNote));
        toast.update(promiseToaster, {
          render: "Eklendi!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      toast.update(promiseToaster, {
        render: `HATA!! ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
    });
};

export const notSilAPI = (id) => (dispatch) => {
  promiseToaster = toast.loading("Notunu siliyoruz.");
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
        const newNote = JSON.parse(res.data.data);
        dispatch(notSil(newNote.id));
        toast.update(promiseToaster, {
          render: "Silindi!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      toast.update(promiseToaster, {
        render: `HATA!! ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeOnClick: true,
      });
    });
};