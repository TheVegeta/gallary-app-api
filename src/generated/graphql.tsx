import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Gallery = {
  __typename?: 'Gallery';
  _id: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  image: Scalars['String']['output'];
  medium: Scalars['String']['output'];
  thumb: Scalars['String']['output'];
};

export type IAuthResponse = {
  __typename?: 'IAuthResponse';
  jwt: Scalars['String']['output'];
  msg: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type ICreateGallery = {
  _id?: InputMaybe<Scalars['String']['input']>;
  image: Scalars['String']['input'];
  medium: Scalars['String']['input'];
  thumb: Scalars['String']['input'];
};

export type ICreateUser = {
  hash: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type IGetById = {
  id: Scalars['String']['input'];
};

export type IStatusResponse = {
  __typename?: 'IStatusResponse';
  data: Scalars['String']['output'];
  msg: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type LikedGallery = {
  __typename?: 'LikedGallery';
  _id: Scalars['String']['output'];
  gallary?: Maybe<Gallery>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddOrUpdateGallary: IStatusResponse;
  addFavouriteGallery: IStatusResponse;
  authUser: IAuthResponse;
  deleteGallary: IStatusResponse;
  registerUser: IAuthResponse;
};


export type MutationAddOrUpdateGallaryArgs = {
  options: ICreateGallery;
};


export type MutationAddFavouriteGalleryArgs = {
  imageId: Scalars['String']['input'];
};


export type MutationAuthUserArgs = {
  options: ICreateUser;
};


export type MutationDeleteGallaryArgs = {
  options: IGetById;
};


export type MutationRegisterUserArgs = {
  options: ICreateUser;
};

export type Query = {
  __typename?: 'Query';
  getAllGallery: Array<Gallery>;
  getMyAllGallery: Array<Gallery>;
  getMyAllLikedGallery: Array<LikedGallery>;
  hello: Scalars['String']['output'];
};


export type QueryGetAllGalleryArgs = {
  pageNo: Scalars['Float']['input'];
};

export type AuthUserMutationVariables = Exact<{
  options: ICreateUser;
}>;


export type AuthUserMutation = { __typename?: 'Mutation', authUser: { __typename?: 'IAuthResponse', success: boolean, msg: string, username: string, jwt: string } };

export type RegisterUserMutationVariables = Exact<{
  options: ICreateUser;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'IAuthResponse', success: boolean, msg: string, username: string, jwt: string } };

export type AddOrUpdateGallaryMutationVariables = Exact<{
  options: ICreateGallery;
}>;


export type AddOrUpdateGallaryMutation = { __typename?: 'Mutation', AddOrUpdateGallary: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type DeleteGallaryMutationVariables = Exact<{
  options: IGetById;
}>;


export type DeleteGallaryMutation = { __typename?: 'Mutation', deleteGallary: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type AddFavouriteGalleryMutationVariables = Exact<{
  imageId: Scalars['String']['input'];
}>;


export type AddFavouriteGalleryMutation = { __typename?: 'Mutation', addFavouriteGallery: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type GetAllGalleryQueryVariables = Exact<{
  pageNo: Scalars['Float']['input'];
}>;


export type GetAllGalleryQuery = { __typename?: 'Query', getAllGallery: Array<{ __typename?: 'Gallery', _id: string, image: string, thumb: string, medium: string, createdAt: string }> };

export type GetMyAllGalleryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAllGalleryQuery = { __typename?: 'Query', getMyAllGallery: Array<{ __typename?: 'Gallery', _id: string, image: string, thumb: string, medium: string, createdAt: string }> };

export type GetMyAllLikedGalleryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyAllLikedGalleryQuery = { __typename?: 'Query', getMyAllLikedGallery: Array<{ __typename?: 'LikedGallery', _id: string, gallary?: { __typename?: 'Gallery', _id: string, image: string, thumb: string, medium: string, createdAt: string } | null }> };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };


export const AuthUserDocument = gql`
    mutation AuthUser($options: ICreateUser!) {
  authUser(options: $options) {
    success
    msg
    username
    jwt
  }
}
    `;
export type AuthUserMutationFn = Apollo.MutationFunction<AuthUserMutation, AuthUserMutationVariables>;

/**
 * __useAuthUserMutation__
 *
 * To run a mutation, you first call `useAuthUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authUserMutation, { data, loading, error }] = useAuthUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAuthUserMutation(baseOptions?: Apollo.MutationHookOptions<AuthUserMutation, AuthUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthUserMutation, AuthUserMutationVariables>(AuthUserDocument, options);
      }
export type AuthUserMutationHookResult = ReturnType<typeof useAuthUserMutation>;
export type AuthUserMutationResult = Apollo.MutationResult<AuthUserMutation>;
export type AuthUserMutationOptions = Apollo.BaseMutationOptions<AuthUserMutation, AuthUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($options: ICreateUser!) {
  registerUser(options: $options) {
    success
    msg
    username
    jwt
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const AddOrUpdateGallaryDocument = gql`
    mutation AddOrUpdateGallary($options: ICreateGallery!) {
  AddOrUpdateGallary(options: $options) {
    success
    msg
    data
  }
}
    `;
export type AddOrUpdateGallaryMutationFn = Apollo.MutationFunction<AddOrUpdateGallaryMutation, AddOrUpdateGallaryMutationVariables>;

/**
 * __useAddOrUpdateGallaryMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateGallaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateGallaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateGallaryMutation, { data, loading, error }] = useAddOrUpdateGallaryMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddOrUpdateGallaryMutation(baseOptions?: Apollo.MutationHookOptions<AddOrUpdateGallaryMutation, AddOrUpdateGallaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOrUpdateGallaryMutation, AddOrUpdateGallaryMutationVariables>(AddOrUpdateGallaryDocument, options);
      }
export type AddOrUpdateGallaryMutationHookResult = ReturnType<typeof useAddOrUpdateGallaryMutation>;
export type AddOrUpdateGallaryMutationResult = Apollo.MutationResult<AddOrUpdateGallaryMutation>;
export type AddOrUpdateGallaryMutationOptions = Apollo.BaseMutationOptions<AddOrUpdateGallaryMutation, AddOrUpdateGallaryMutationVariables>;
export const DeleteGallaryDocument = gql`
    mutation DeleteGallary($options: IGetById!) {
  deleteGallary(options: $options) {
    success
    msg
    data
  }
}
    `;
export type DeleteGallaryMutationFn = Apollo.MutationFunction<DeleteGallaryMutation, DeleteGallaryMutationVariables>;

/**
 * __useDeleteGallaryMutation__
 *
 * To run a mutation, you first call `useDeleteGallaryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGallaryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGallaryMutation, { data, loading, error }] = useDeleteGallaryMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteGallaryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGallaryMutation, DeleteGallaryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGallaryMutation, DeleteGallaryMutationVariables>(DeleteGallaryDocument, options);
      }
export type DeleteGallaryMutationHookResult = ReturnType<typeof useDeleteGallaryMutation>;
export type DeleteGallaryMutationResult = Apollo.MutationResult<DeleteGallaryMutation>;
export type DeleteGallaryMutationOptions = Apollo.BaseMutationOptions<DeleteGallaryMutation, DeleteGallaryMutationVariables>;
export const AddFavouriteGalleryDocument = gql`
    mutation AddFavouriteGallery($imageId: String!) {
  addFavouriteGallery(imageId: $imageId) {
    success
    msg
    data
  }
}
    `;
export type AddFavouriteGalleryMutationFn = Apollo.MutationFunction<AddFavouriteGalleryMutation, AddFavouriteGalleryMutationVariables>;

/**
 * __useAddFavouriteGalleryMutation__
 *
 * To run a mutation, you first call `useAddFavouriteGalleryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavouriteGalleryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavouriteGalleryMutation, { data, loading, error }] = useAddFavouriteGalleryMutation({
 *   variables: {
 *      imageId: // value for 'imageId'
 *   },
 * });
 */
export function useAddFavouriteGalleryMutation(baseOptions?: Apollo.MutationHookOptions<AddFavouriteGalleryMutation, AddFavouriteGalleryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFavouriteGalleryMutation, AddFavouriteGalleryMutationVariables>(AddFavouriteGalleryDocument, options);
      }
export type AddFavouriteGalleryMutationHookResult = ReturnType<typeof useAddFavouriteGalleryMutation>;
export type AddFavouriteGalleryMutationResult = Apollo.MutationResult<AddFavouriteGalleryMutation>;
export type AddFavouriteGalleryMutationOptions = Apollo.BaseMutationOptions<AddFavouriteGalleryMutation, AddFavouriteGalleryMutationVariables>;
export const GetAllGalleryDocument = gql`
    query GetAllGallery($pageNo: Float!) {
  getAllGallery(pageNo: $pageNo) {
    _id
    image
    thumb
    medium
    createdAt
  }
}
    `;

/**
 * __useGetAllGalleryQuery__
 *
 * To run a query within a React component, call `useGetAllGalleryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllGalleryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllGalleryQuery({
 *   variables: {
 *      pageNo: // value for 'pageNo'
 *   },
 * });
 */
export function useGetAllGalleryQuery(baseOptions: Apollo.QueryHookOptions<GetAllGalleryQuery, GetAllGalleryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllGalleryQuery, GetAllGalleryQueryVariables>(GetAllGalleryDocument, options);
      }
export function useGetAllGalleryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllGalleryQuery, GetAllGalleryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllGalleryQuery, GetAllGalleryQueryVariables>(GetAllGalleryDocument, options);
        }
export type GetAllGalleryQueryHookResult = ReturnType<typeof useGetAllGalleryQuery>;
export type GetAllGalleryLazyQueryHookResult = ReturnType<typeof useGetAllGalleryLazyQuery>;
export type GetAllGalleryQueryResult = Apollo.QueryResult<GetAllGalleryQuery, GetAllGalleryQueryVariables>;
export const GetMyAllGalleryDocument = gql`
    query GetMyAllGallery {
  getMyAllGallery {
    _id
    image
    thumb
    medium
    createdAt
  }
}
    `;

/**
 * __useGetMyAllGalleryQuery__
 *
 * To run a query within a React component, call `useGetMyAllGalleryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAllGalleryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAllGalleryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAllGalleryQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAllGalleryQuery, GetMyAllGalleryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAllGalleryQuery, GetMyAllGalleryQueryVariables>(GetMyAllGalleryDocument, options);
      }
export function useGetMyAllGalleryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAllGalleryQuery, GetMyAllGalleryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAllGalleryQuery, GetMyAllGalleryQueryVariables>(GetMyAllGalleryDocument, options);
        }
export type GetMyAllGalleryQueryHookResult = ReturnType<typeof useGetMyAllGalleryQuery>;
export type GetMyAllGalleryLazyQueryHookResult = ReturnType<typeof useGetMyAllGalleryLazyQuery>;
export type GetMyAllGalleryQueryResult = Apollo.QueryResult<GetMyAllGalleryQuery, GetMyAllGalleryQueryVariables>;
export const GetMyAllLikedGalleryDocument = gql`
    query GetMyAllLikedGallery {
  getMyAllLikedGallery {
    _id
    gallary {
      _id
      image
      thumb
      medium
      createdAt
    }
  }
}
    `;

/**
 * __useGetMyAllLikedGalleryQuery__
 *
 * To run a query within a React component, call `useGetMyAllLikedGalleryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyAllLikedGalleryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyAllLikedGalleryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyAllLikedGalleryQuery(baseOptions?: Apollo.QueryHookOptions<GetMyAllLikedGalleryQuery, GetMyAllLikedGalleryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyAllLikedGalleryQuery, GetMyAllLikedGalleryQueryVariables>(GetMyAllLikedGalleryDocument, options);
      }
export function useGetMyAllLikedGalleryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyAllLikedGalleryQuery, GetMyAllLikedGalleryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyAllLikedGalleryQuery, GetMyAllLikedGalleryQueryVariables>(GetMyAllLikedGalleryDocument, options);
        }
export type GetMyAllLikedGalleryQueryHookResult = ReturnType<typeof useGetMyAllLikedGalleryQuery>;
export type GetMyAllLikedGalleryLazyQueryHookResult = ReturnType<typeof useGetMyAllLikedGalleryLazyQuery>;
export type GetMyAllLikedGalleryQueryResult = Apollo.QueryResult<GetMyAllLikedGalleryQuery, GetMyAllLikedGalleryQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;