import { gapiConfig } from "../../config";
const GOOGLE_APIS_TASK_ENDPOINT = "https://www.googleapis.com/tasks/v1";
const scopes = "https://www.googleapis.com/auth/tasks";

/** Included for testing purposes */
let authorizeButton = document.getElementById("authorize-button");
let signoutButton = document.getElementById("signout-button");
async function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
  }
}
/************/

/**
 * Initializes the gapi client.
 * @return {void}
 */
async function start() {
  try {
    await gapi.client.init({
      apiKey: gapiConfig.apiKey,
      clientId: gapiConfig.clientID,
      scope: scopes,
    });

    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    authorizeButton.onclick = signIn;
    signoutButton.onclick = signOut;
  } catch (e) {
    console.log("error initializing gapi client ", e);
  }
}

/**
 * Initiates sign in to google account through OAuth
 * @return {void}
 */
function signIn() {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 * Initiates sign out of google account through OAuth
 */
function signOut() {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Initializes the Google API client on load.
 * @return {void}
 */
function initializeGapi() {
  gapi.load("client", start);
}

/**
 * Creates a gapi client request object for fetching tasks by listID.
 * @param {string} listID
 * @returns {goog.Thenable}
 */
function createGetTaskByListIDRequest(listID) {
  return gapi.client.request({
    path: `${GOOGLE_APIS_TASK_ENDPOINT}/lists/${listID}/tasks`,
  });
}

/**
 * Fetches all tasks for the given listID(s)
 * @async
 * @param {string|string[]>} listID
 */
async function getAllTasks(listID) {
  if (Array.isArray(listID)) {
    try {
      const batch = new gapi.client.HttpBatch();
      listID.forEach((id) =>
        batch.add(createGetTaskByListIDRequest(id), { id, callback: () => {} })
      );

      const response = await batch.then();
      let { result } = response;

      for (const taskList in result) {
        result[taskList] = result[taskList].result.items;
      }
      return result;
    } catch (e) {
      console.log("Error fetching batched tasks: ", e);
      return [];
    }
  } else {
    return await getTasksByListID(listID);
  }
}

/**
 * Get all of the users lists.
 * @async
 * @returns {Promise<>}
 */
async function getAllLists() {
  console.log(gapi);
  try {
    let response = await gapi.client.request({
      path: `${GOOGLE_APIS_TASK_ENDPOINT}/users/@me/lists`,
    });
    return response.result.items;
  } catch (e) {
    console.log("Error fetching lists: ", e);
  }
  return null;
}

async function getTasksByListID(listID) {
  try {
    let response = await gapi.client.request({
      path: `${GOOGLE_APIS_TASK_ENDPOINT}/lists/${listID}/tasks`,
    });
    return response.result.items;
  } catch (e) {
    console.log("Error fetching tasks: ", e);
    return [];
  }
}

initializeGapi();

const googleTaskService = {
  getAllLists,
  getAllTasks,
  getTasksByListID,
};

export default googleTaskService;
