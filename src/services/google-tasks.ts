import { gapiConfig } from "../../config";
import { GoogleTaskList } from "../interfaces/google-tasklists";
import { GoogleTasks } from "../interfaces/google-tasks";

const GOOGLE_APIS_TASK_ENDPOINT = "https://www.googleapis.com/tasks/v1";
const scopes = "https://www.googleapis.com/auth/tasks";

/** Included for testing purposes */
let authorizeButton: HTMLElement | null = document.getElementById(
  "authorize-button"
);
let signoutButton: HTMLElement | null = document.getElementById(
  "signout-button"
);

async function updateSigninStatus(isSignedIn: boolean) {
  if (isSignedIn) {
    if (authorizeButton) authorizeButton.style.display = "none";
    if (signoutButton) signoutButton.style.display = "block";
  } else {
    if (authorizeButton) authorizeButton.style.display = "block";
    if (signoutButton) signoutButton.style.display = "none";
  }
}
/************/

/**
 * Initializes the gapi client.
 */
async function start(): Promise<void> {
  try {
    await gapi.client.init({
      apiKey: gapiConfig.apiKey,
      clientId: gapiConfig.clientID,
      scope: scopes,
    });

    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    if (authorizeButton) authorizeButton.onclick = signIn;
    if (signoutButton) signoutButton.onclick = signOut;
  } catch (e) {
    console.log("error initializing gapi client ", e);
  }
}

/**
 * Initiates sign in to google account through OAuth
 */
function signIn(): void {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 * Initiates sign out of google account through OAuth
 */
function signOut(): void {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Initializes the Google API client on load.
 */
function initializeGapi(): void {
  gapi.load("client", start);
}

/**
 * Creates a gapi client request object for fetching tasks by listID.
 *
 * @param listID - The listID to create the client request for.
 * @returns The Client Request for the https://www.googleapis.com/tasks/v1/lists/${listID}/tasks endpoint.
 */
function createGetTaskByListIDRequest(
  listID: string
): gapi.client.HttpRequest<any> {
  return gapi.client.request({
    path: `${GOOGLE_APIS_TASK_ENDPOINT}/lists/${listID}/tasks`,
  });
}

/**
 * Fetches tasks for a single task list.
 *
 * @param listID - The listID associated with the tasks to fetch.
 * @returns A promise that will resolve to a list of tasks.
 */
async function getTasksByListID(listID: string): Promise<GoogleTasks[]> {
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

/**
 * Fetches all tasks for the given listID(s)
 *
 * @param listID - Can be a single listID or a list of ListID's to fetch tasks for.
 * @returns A promise that will resolve to a mapping of listID to a list of tasks.
 */
async function getAllTasks(
  listID: string | string[]
): Promise<{ [key: string]: GoogleTasks[] }> {
  if (Array.isArray(listID)) {
    try {
      const batch = gapi.client.newBatch();
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
      return {};
    }
  } else {
    const tasks = await getTasksByListID(listID);
    return {
      listId: tasks,
    };
  }
}

/**
 * Get all of the users lists.
 *
 * @returns A promise that will resolve to a list of tasklists.
 */
async function getAllLists(): Promise<GoogleTaskList[]> {
  try {
    let response = await gapi.client.request({
      path: `${GOOGLE_APIS_TASK_ENDPOINT}/users/@me/lists`,
    });
    return response.result.items;
  } catch (e) {
    console.log("Error fetching lists: ", e);
  }
  return [];
}

initializeGapi();

const googleTaskService = {
  getAllLists,
  getAllTasks,
};

export default googleTaskService;
