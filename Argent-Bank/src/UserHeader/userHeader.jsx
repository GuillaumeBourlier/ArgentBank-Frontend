// créer un composant UserHeader pour afficher le nom de l'utilisateur et un bouton pour modifier le nom
// Créer le formulaire pour modifier le nom d'utilisateur, le formmulaire doit être ouvert lorsque l'utilisateur clique sur le bouton "Edit Name"
// Ne pas oublier de gérer l'état du formulaire et de mettre à jour le nom d'utilisateur dans le store Redux

const UserHeader = ({ firstName, lastName }) => (
  <div className="header">
    <h1>
      Welcome back<br />
      {firstName} {lastName}!
    </h1>
    <button className="edit-button">Edit Name</button>
  </div>
);

export default UserHeader;