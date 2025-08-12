// const local = "http://localhost:8080";
// const local = "https://backend-blood-srh4.onrender.com";
const local = ""
const pro = "https://backend-blood-srh4.onrender.com";
// const pro = ""
let base_url = "";
let mode = "local";
if (mode === "pro") {
  base_url = pro;
} else {
  base_url = local;
}
export { base_url };
