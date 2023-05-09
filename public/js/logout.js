const logoutBtn = document.querySelector("#logout-link")

logoutBtn.addEventListener("click", async () => {
  const response = await fetch("/api/farmers/logout", {
    method: "DELETE",
  })
  console.log(response)
})