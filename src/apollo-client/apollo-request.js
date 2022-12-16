import { gql } from "@apollo/client";

export const GET_ALLTASKS = gql`
  query Query($page: Int, $stateId: String) {
    getTaskByState(page: $page, stateId: $stateId) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
          duration
        }
        now_state {
          state_id
          date
          duration
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const GET_ALLORGANISATIONS = gql`
  query GetAllOrganisations {
    getAllOrganisations {
      _id
      title
      full_name
      icon
      idfification_number
      kpp
      oked
    }
  }
`;
export const GET_USERROLE = gql`
  query GetRole($token: String) {
    getRole(token: $token) {
      _id
      title
      icon
      description
      permmission {
        _id
        title
        description
        implementer
        state
        priority
        files
        comments
        admin
      }
    }
  }
`;

export const GET_USER = gql`
  query Query($userId: [String]) {
    getUser(userId: $userId) {
      _id
      first_name
      last_name
      middle_name
      full_name
      post
      depaptament
      organisation_id
      login
      hashed_password
      telegram_chat_id
    }
  }
`;

export const GET_ALL_STATE = gql`
  query Query {
    getAllState {
      _id
      title
    }
  }
`;

export const GET_ALL_IMPLEMENTER = gql`
  query Query {
    getAllImplementer {
      _id
      first_name
      last_name
      middle_name
      full_name
      post
      depaptament
      organisation_id
      login
      hashed_password
      telegram_chat_id
    }
  }
`;

export const GET_USER_BY_TOKEN = gql`
  query Query($token: String) {
    getUserByToken(token: $token) {
      _id
      first_name
      last_name
      middle_name
      full_name
      post
      depaptament
      organisation_id
      login
      hashed_password
      telegram_chat_id
    }
  }
`;

export const GET_ORG = gql`
  query GetOrgByUserId($userId: String) {
    getOrgByUserId(userId: $userId) {
      _id
      title
      full_name
      icon
      idfification_number
      kpp
      oked
    }
  }
`;

export const GET_ONE_TASK = gql`
  query Query($taskId: String) {
    getTask(taskId: $taskId) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
        }
        now_state {
          state_id
          date
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const GET_STATE_TO_TASK = gql`
  query GetState($stateId: String) {
    getState(stateId: $stateId) {
      _id
      title
    }
  }
`;
export const GET_STATE_TIME = gql`
  query Query($taskId: String) {
    getStateTime(taskId: $taskId) {
      state_id
      date
      duration
    }
  }
`;

export const GET_TYPE = gql`
  query Query($typeTitle: String) {
    getType(typeTitle: $typeTitle) {
      _id
      title
      sla
    }
  }
`;

export const GET_ALL_COMMENTS_TO_TASK = gql`
  query Query($taskId: String) {
    getAllComments(taskId: $taskId) {
      _id
      comments
      task_id
      author_id
    }
  }
`;

export const GET_ALL_ROLES = gql`
  query GetRole {
    getAllRoles {
      _id
      title
      icon
      description
      permmission {
        _id
        title
        description
        implementer
        state
        priority
        files
        comments
        admin
      }
    }
  }
`;
export const GET_ALL_USER = gql`
  query Query {
    getAllUsers {
      _id
      first_name
      last_name
      middle_name
      full_name
      post
      depaptament
      organisation_id
      login
      hashed_password
      telegram_chat_id
    }
  }
`;

export const GET_ALL_USER_TASKS = gql`
  query Query($token: String) {
    getAllUserTasks(token: $token) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
        }
        now_state {
          state_id
          date
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const GET_ALL_USER_IMPLEMENTER_TASKS = gql`
  query Query($token: String) {
    getAllUserImplementerTasks(token: $token) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
        }
        now_state {
          state_id
          date
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const GET_ALL_STASUS = gql`
  query GetState {
    getAllState {
      _id
      title
    }
  }
`;
export const GET_STATE = gql`
  query GetState($stateId: String) {
    getState(stateId: $stateId) {
      _id
      title
    }
  }
`;

export const GET_ALL_TASKS_WITH_STATUS = gql`
  query Query($statusId: String) {
    getAllTasksWithStatus(statusId: $statusId) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
        }
        now_state {
          state_id
          date
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation Mutation($token: String, $taskData: inputTask) {
    addTask(token: $token, taskData: $taskData) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
        }
        now_state {
          state_id
          date
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const ADD_COMMENT_TO_TASK = gql`
  mutation Mutation($commentsData: inputComments, $token: String) {
    addCommentsToTask(commentsData: $commentsData, token: $token) {
      _id
      comments
      task_id
      author_id
    }
  }
`;
export const ADD_ORGANISATION = gql`
  mutation Mutation($org: inputOrganisation) {
    addOrganisation(org: $org) {
      _id
      title
      full_name
      icon
      idfification_number
      kpp
      oked
      org_data {
        identification_number
        org_passHash
      }
    }
  }
`;

export const ADD_FILE_TO_TASK = gql`
  mutation Mutation($taskId: String, $fileData: inputTaskFile, $token: String) {
    addFileToTask(taskId: $taskId, fileData: $fileData, token: $token) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
        }
        now_state {
          state_id
          date
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const ADD_IMPLEM_TO_TASK = gql`
  mutation Mutation($implemId: [String], $taskId: String) {
    addImplemToTask(implemId: $implemId, taskId: $taskId) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
          duration
        }
        now_state {
          state_id
          date
          duration
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const ADD_ROLE = gql`
  mutation AddRoles($roles: inputRoles, $rolesTasks: inputRoleTaskPermmission) {
    addRoles(roles: $roles, rolesTasks: $rolesTasks) {
      _id
      title
      icon
      description
      permmission {
        _id
        title
        description
        implementer
        state
        priority
        files
        comments
        admin
      }
    }
  }
`;
// In request
// {
//   "roles": {
//     "title": null,
//     "icon": null,
//     "description": null
//   },
//   "rolesTasks": {
//     "title": null,
//     "description": null,
//     "implementer": null,
//     "state": null,
//     "priority": null,
//     "files": null,
//     "comments": null,
//     "admin": null
//   }
// }

export const ADD_USER_FOR_ADMIN = gql`
  mutation Mutation($user: inputUsers) {
    addUsers(user: $user) {
      _id
      first_name
      last_name
      middle_name
      full_name
      post
      depaptament
      organisation_id
      login
      hashed_password
      telegram_chat_id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($token: String, $updateData: inputUpdateUsers) {
    updateUser(token: $token, updateData: $updateData) {
      _id
      first_name
      last_name
      middle_name
      full_name
      post
      depaptament
      organisation_id
      login
      hashed_password
      telegram_chat_id
    }
  }
`;

export const UPDATE_STATE_TO_TASK = gql`
  mutation Mutation($stateId: String, $taskId: String, $duration: String) {
    updateStateToTask(stateId: $stateId, taskId: $taskId, duration: $duration) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
          duration
        }
        now_state {
          state_id
          date
          duration
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;

export const ADD_USER_ROLE = gql`
  mutation Mutation($roleId: String, $userId: String) {
    addUserRoles(roleId: $roleId, userId: $userId) {
      _id
      user_id
      role_id
    }
  }
`;
export const UPDATE_USER_ROLE = gql`
  mutation Mutation($userId: String, $roleId: String) {
    updateUserRoles(userId: $userId, roleId: $roleId) {
      _id
      user_id
      role_id
    }
  }
`;
export const ADD_CONTACT = gql`
  mutation Mutation($typeCi: inputTypeCI, $contact: inputContacts) {
    addContacts(typeCI: $typeCi, contact: $contact) {
      _id
      user_id
      type_ci {
        _id
        title
        icon
      }
    }
  }
`;

export const ADD_PARAMS_TO_TASK = gql`
  mutation FileUpload($taskId: String, $params: inputTaskParams) {
    addParamsToTask(taskId: $taskId, params: $params) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;
// In request
// {
//   "taskId": null,
//   "params": {
//     "task_type_id": null,
//     "acceptence_date": null,
//     "finished_date": null,
//     "implementer_id": null,
//     "state_id": null,
//     "priority": null,
//     "mata_tags": null
//   }
// }

export const ADD_STATE_TO_TASK = gql`
  mutation Mutation($taskId: String, $stateData: inputStateTask) {
    addStateToTask(taskId: $taskId, stateData: $stateData) {
      _id
      task_type_id
      title
      description
      create_date
      acceptence_date
      finished_date
      author_id
      implementer_id
      state_id
      state_time {
        old_state {
          state_id
          date
        }
        now_state {
          state_id
          date
        }
      }
      priority
      mata_tags
      files {
        _id
        name
        author_id
        create_date
        file_url
      }
    }
  }
`;
// In request
// {
//   "taskId": null,
//   "stateData": {
//     "sla": null,
//     "title": null
//   }
// }
