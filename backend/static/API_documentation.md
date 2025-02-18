# Citizen Science App for Kids API
## Version: 1.0.0

### /

#### GET
##### Description:

Returns message showing app is up

##### Responses

| Code | Description                         |
|------|-------------------------------------|
| 200  | Welcome to the Citizen Science App! |

### /users

#### POST
##### Description:

Creates a new user

##### Parameters

| Name      | Located in | Description           | Required | Schema                |
|-----------|------------|-----------------------|----------|-----------------------|
| user data | body       | JSON data for the api | Yes      | [UserData](#UserData) |

##### Responses

| Code | Description               |
|------|---------------------------|
| 201  | User created successfully |
| 400  | Invalid request           |

### /classes

#### POST
##### Description:

Creates a new class

##### Parameters

| Name       | Located in | Description           | Required | Schema                  |
|------------|------------|-----------------------|----------|-------------------------|
| class data | body       | JSON data for the api | Yes      | [ClassData](#ClassData) |

##### Responses

| Code | Description                |
|------|----------------------------|
| 201  | Class created successfully |
| 400  | Invalid request            |

### /projects

#### POST
##### Description:

Creates a new project

##### Parameters

| Name         | Located in | Description           | Required | Schema                      |
|--------------|------------|-----------------------|----------|-----------------------------|
| project data | body       | JSON data for the api | Yes      | [ProjectData](#ProjectData) |

##### Responses

| Code | Description                  |
|------|------------------------------|
| 201  | Project created successfully |
| 400  | Invalid request              |

### /projects/class/{class_id}

#### GET
##### Description:

Retrieves all projects for a class

##### Parameters

| Name     | Located in | Description | Required | Schema  |
|----------|------------|-------------|----------|---------|
| class_id | path       |             | Yes      | integer |

##### Responses

| Code | Description                    |
|------|--------------------------------|
| 200  | Projects obtained successfully |

### /projects/class_code/{class_code}

#### GET
##### Description:

Retrieves all projects linked to a class code for mobile

##### Parameters

| Name       | Located in | Description | Required | Schema |
|------------|------------|-------------|----------|--------|
| class_code | path       |             | Yes      | string |

##### Responses

| Code | Description                    |
|------|--------------------------------|
| 200  | Projects obtained successfully |
| 404  | Class not found                |

### /projects/{project_id}

#### GET
##### Description:

Retrieves a project by its id

##### Parameters

| Name       | Located in | Description | Required | Schema  |
|------------|------------|-------------|----------|---------|
| project_id | path       |             | Yes      | integer |

##### Responses

| Code | Description                   |
|------|-------------------------------|
| 200  | Project obtained successfully |
| 404  | Project not found             |

### /observations

#### POST
##### Description:

Creates a new observation

##### Parameters

| Name             | Located in | Description           | Required | Schema                              |
|------------------|------------|-----------------------|----------|-------------------------------------|
| observation data | body       | JSON data for the api | Yes      | [ObservationData](#ObservationData) |

##### Responses

| Code | Description                      |
|------|----------------------------------|
| 201  | Observation created successfully |
| 400  | Invalid request                  |

### /observations/project/{project_id}

#### GET
##### Description:

Fetches all observations for a project

##### Parameters

| Name       | Located in | Description | Required | Schema  |
|------------|------------|-------------|----------|---------|
| project_id | path       |             | Yes      | integer |

##### Responses

| Code | Description                        |
|------|------------------------------------|
| 200  | Observations obtained successfully |

### /observations/{obs_id}

#### GET
##### Description:

Retrieves an observation by its id

##### Parameters

| Name   | Located in | Description | Required | Schema  |
|--------|------------|-------------|----------|---------|
| obs_id | path       |             | Yes      | integer |

##### Responses

| Code | Description                       |
|------|-----------------------------------|
| 200  | Observation obtained successfully |
| 404  | Observation not found             |

#### PUT
##### Description:

Update an observation of a given id

##### Parameters

| Name                           | Located in | Description           | Required | Schema                              |
|--------------------------------|------------|-----------------------|----------|-------------------------------------|
| obs_id                         | path       |                       | Yes      | integer                             |
| observation data to be updated | body       | JSON data for the api | Yes      | [ObservationData](#ObservationData) |

##### Responses

| Code | Description                      |
|------|----------------------------------|
| 200  | Observation updated successfully |
| 400  | Invalid request                  |
| 404  | Observation not found            |

#### DELETE
##### Description:

Deletes an observation of a given id

##### Parameters

| Name   | Located in | Description | Required | Schema  |
|--------|------------|-------------|----------|---------|
| obs_id | path       |             | Yes      | integer |

##### Responses

| Code | Description                      |
|------|----------------------------------|
| 200  | Observation deleted successfully |
| 404  | Observation not found            |

### /anonymous_users

#### POST
##### Description:

Creates a new anonymous user

##### Parameters

None

##### Responses

| Code | Description                         |
|------|-------------------------------------|
| 201  | Anonymous user created successfully |
| 400  | Invalid request                     |

### /anonymous_users/authenticate

#### POST
##### Description:

Verifies an anonymous user by token

##### Parameters

| Name                 | Located in | Description           | Required | Schema                          |
|----------------------|------------|-----------------------|----------|---------------------------------|
| Anonymous user token | body       | JSON data for the api | Yes      | [AnonymousData](#AnonymousData) |

##### Responses

| Code | Description                               |
|------|-------------------------------------------|
| 200  | Anonymous user authenticated successfully |
| 401  | Invalid token                             |
| 404  | Invalid token                             |

### /anonymous_users/{token}

#### GET
##### Description:

Retrieves an anonymous user by token

##### Parameters

| Name  | Located in | Description | Required | Schema |
|-------|------------|-------------|----------|--------|
| token | path       |             | Yes      | string |

##### Responses

| Code | Description                          |
|------|--------------------------------------|
| 200  | Anonymous user obtained successfully |
| 404  | Anonymous user not found             |

### Models


#### UserData

| Name     | Type   | Description | Required |
|----------|--------|-------------|----------|
| username | string |             | No       |
| email    | string |             | No       |
| role     | string |             | No       |
| password | string |             | No       |

#### ClassData

| Name               | Type    | Description | Required |
|--------------------|---------|-------------|----------|
| teacher_id         | integer |             | No       |
| class_code         | string  |             | No       |
| class_name         | string  |             | No       |
| description        | string  |             | No       |
| number_of_students | integer |             | No       |

#### ProjectData

| Name            | Type    | Description | Required |
|-----------------|---------|-------------|----------|
| class_id        | integer |             | No       |
| teacher_id      | integer |             | No       |
| project_code    | string  |             | No       |
| title           | string  |             | No       |
| description     | string  |             | No       |
| directions      | string  |             | No       |
| form_definition | object  |             | No       |

#### ObservationData

| Name         | Type    | Description | Required |
|--------------|---------|-------------|----------|
| project_id   | integer |             | No       |
| anon_user_id | integer |             | No       |
| data         | object  |             | No       |

#### AnonymousData

| Name  | Type   | Description | Required |
|-------|--------|-------------|----------|
| token | string |             | No       |