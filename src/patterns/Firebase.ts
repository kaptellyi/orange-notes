export type FirebaseUser = firebase.default.User;
export interface AppUser extends FirebaseUser {
  isGuideCompleted: boolean;
}
export type FirestoreDoc = firebase.default.firestore.DocumentReference<firebase.default.firestore.DocumentData>;
