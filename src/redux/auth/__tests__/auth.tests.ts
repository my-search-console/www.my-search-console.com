// import { ErrorEntity, UserEntity } from "@foudroyer/interfaces"
// import { localStorageKeys } from "../../../constants/localStorageKeys"
// import { NotificationMessageEntity } from "../../../entities/NotificationEntity"
// import { createStoreForTests } from "../../../utils/createStoreForTests"

// describe("auth tests suite", () => {
//   describe("$authenticateWithGoogle tests:", () => {
//     it("je suis un user, je veux pouvoir me connecter", async () => {
//       const { store, actions, di } = createStoreForTests()

//       expect(store.getState().auth.authenticated).toEqual(false)
//       expect(store.getState().auth.isFetching).toEqual(false)

//       const user: UserEntity = {
//         id: "1",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       const promise = store.dispatch<any>(
//         actions.auth.$authenticateWithGoogle()
//       )

//       expect(store.getState().auth.isFetching).toEqual(true)

//       await promise

//       expect(store.getState().auth.isFetching).toEqual(false)
//       expect(store.getState().auth.authenticated).toEqual(true)
//       expect(store.getState().auth.user).toEqual(user)
//     })

//     it("je suis un user, si je suis connecté, je dois être redirigé vers /administration/", async () => {
//       const { store, actions, di } = createStoreForTests()

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(di.LocationService.getPathname()).toEqual("/administration/")
//     })

//     it("je suis un user, si l'API getUserInfo retourne une erreur, alors je suis pas connecté et j'ai une notification d'erreur", async () => {
//       const { store, actions, di } = createStoreForTests()

//       expect(store.getState().notifications.notifications.length).toEqual(0)

//       const user: UserEntity = {
//         id: "user_info_error",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(store.getState().auth.authenticated).toEqual(false)
//       expect(store.getState().notifications.notifications.length > 0).toEqual(
//         true
//       )
//       expect(store.getState().notifications.notifications[0].message).toEqual(
//         ErrorEntity.USER_NOT_FOUND
//       )
//     })

//     it("je suis un user et que je me connecte, je veux envoyer les infos à AnalyticsService", async () => {
//       const { store, actions, di } = createStoreForTests()

//       expect(store.getState().notifications.notifications.length).toEqual(0)

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(di.AnalyticsService.getAllAnalytics()).toEqual([
//         { action: "login", category: "authentication" },
//       ])
//       expect(di.AnalyticsService.isAuthenticated()).toEqual(true)
//     })

//     it("je suis un user et que je me connecte, je veux que le token soit bien stocké dans le LocalStorage", async () => {
//       const { store, actions, di } = createStoreForTests()

//       expect(store.getState().notifications.notifications.length).toEqual(0)

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(di.LocalStorageService.get(localStorageKeys.TOKEN_KEY)).toEqual(
//         "access-token"
//       )
//     })

//     it("je suis un user et que je me connecte, si une erreur intervient au moment de se connecter avec Google, alors on affiche une notification et on est pas connecté", async () => {
//       const { store, actions, di } = createStoreForTests()

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(store.getState().notifications.notifications.length).toEqual(1)
//       expect(store.getState().notifications.notifications[0].message).toEqual(
//         ErrorEntity.GOOGLE_AUTH_SCOPE_NOT_FOUND
//       )
//     })

//     it("je suis un user connecté qui a déjà relié mon compte avec Bing, alors Bing doit être actif dans le state", async () => {
//       const { store, actions, di } = createStoreForTests()

//       expect(store.getState().auth.accountConnectedTo.bing).toEqual(false)

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])
//       di.AuthRepository.__storeSources({
//         google: true,
//         bing: true,
//         yandex: false,
//       })

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(store.getState().auth.accountConnectedTo.bing).toEqual(true)
//     })
//   })

//   describe("$logout tests:", () => {
//     it("je me logout, alors le isAuthenticated passe à false.", async () => {
//       const { store, actions, di } = createStoreForTests()

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(store.getState().auth.authenticated).toEqual(true)

//       await store.dispatch<any>(actions.auth.$logout())

//       expect(store.getState().auth.authenticated).toEqual(false)
//     })
//     it("je me logout, alors le token en localStorage est supprimé.", async () => {
//       const { store, actions, di } = createStoreForTests()

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(di.LocalStorageService.get(localStorageKeys.TOKEN_KEY)).toEqual(
//         "access-token"
//       )

//       await store.dispatch<any>(actions.auth.$logout())

//       expect(di.LocalStorageService.get(localStorageKeys.TOKEN_KEY)).toBeNull()
//     })
//     it("je me logout, je suis redirigé vers /.", async () => {
//       const { store, actions, di } = createStoreForTests()

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(di.LocationService.getPathname()).toEqual("/administration/")

//       await store.dispatch<any>(actions.auth.$logout())

//       expect(di.LocationService.getPathname()).toEqual("/")
//     })
//     it("je me logout, un événement est envoyé vers AnalyticsService.", async () => {
//       const { store, actions, di } = createStoreForTests()

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       expect(di.AnalyticsService.getAllAnalytics().length).toEqual(1)

//       await store.dispatch<any>(actions.auth.$logout())

//       expect(di.AnalyticsService.getAllAnalytics().length).toEqual(2)
//       expect(di.AnalyticsService.getAllAnalytics()[1]).toEqual({
//         action: "logout",
//         category: "authentication",
//       })
//     })
//   })

//   describe("$isAuthenticated tests:", () => {
//     it("si je ne suis pas loggué, donc la fonction me retourne false.", async () => {
//       const { store, actions } = createStoreForTests()

//       const isAuthenticated = await store.dispatch<any>(
//         actions.auth.$isAuthenticated()
//       )

//       expect(isAuthenticated).toEqual(false)
//     })
//     it("si je suis loggué, appeler isAuthenticated active puis désactive setFetching", async () => {
//       const { store, actions, di } = createStoreForTests()

//       const user: UserEntity = {
//         id: "id",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       const promise = store.dispatch<any>(actions.auth.$isAuthenticated())

//       expect(store.getState().auth.isFetching).toEqual(true)

//       await promise

//       expect(store.getState().auth.isFetching).toEqual(false)
//     })
//     it("si j'ai un token mais que la récupération des infos de l'user retourne une erreur, je redirige vers /", async () => {
//       const { store, actions, di } = createStoreForTests()

//       const user: UserEntity = {
//         id: "user_info_error",
//         email: "email",
//       }

//       di.AuthRepository.store([user])

//       await store.dispatch<any>(actions.auth.$authenticateWithGoogle())

//       await store.dispatch<any>(actions.auth.$isAuthenticated())

//       expect(di.LocationService.getPathname()).toEqual("/")
//     })
//   })
// })
