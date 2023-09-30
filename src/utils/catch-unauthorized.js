import store from "@/store";
import router from "@/routes";

export default function catchUnauthorized(error) {
  if (error.response.status === 401) {
    localStorage.clear();
    store.commit("SET_USER_APP", "");
    store.commit("SET_TOKEN_APP", "");

    console.log("Unauthorized");
    router.push("/login");
  }
}
