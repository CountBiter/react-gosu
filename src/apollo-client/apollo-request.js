import { gql } from "@apollo/client";

export const GET_ALLTASKS = gql`
  query GetTaskByState($page: Int, $stateId: String) {
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
  query GetTask($taskId: String) {
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

export const GET_ALL_USER_TASKS = gql`
  query GetAllUserTasks($token: String) {
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
  query GetAllUserImplementerTasks($token: String) {
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
  mutation addTask($taskData: inputTask, $token: String) {
    addTask(taskData: $taskData, token: $token) {
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
//   "taskData": {
//     "title": null,
//     "description": null,
//     "create_date": null,
//     " mata_tags": [String]
//     "files": [
//       {
//         "name": null,
//         "create_date": null,
//         "file_url": null
//       }
//     ]
//   },
//   "token": null
// }

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
  mutation AddOrganisation($org: inputOrganisation) {
    addOrganisation(org: $org) {
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
// In request
// {
//   "org": {
//     "title": null,
//     "icon": null,
//     "full_name": null,
//     "idfification_number": null,
//     "kpp": null,
//     "oked": null
//   }
// }

export const ADD_FILE_TO_TASK = gql`
  mutation AddFileToTask(
    $taskId: String
    $fileData: inputTaskFile
    $token: String
  ) {
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
//   "fileData": {
//     "name": null,
//     "file_url": null,
//     "create_date": null
//   },
//   "token": null
// }

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

export const ADD_USER_ROLE = gql`
  mutation Mutation($roleId: String, $userId: String) {
    addUserRoles(roleId: $roleId, userId: $userId) {
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
