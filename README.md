Bienvenue sur la dApp d'Ambassad'Horse

La stack:

- react-native-web via Expo (boilerplate ignite react-native)
- hardhat
- vercel

Le réseau:

- Mumbai(MATIC) de Polygon

Lancer hardhat:

```
cd hardhat
npx hardhat run ./scripts/deploy.ts --network mumbai
```

Puis récupérer l'adresse du contrat

Environnement:

- installer le .env à partir du .env.example
- ajouter l'adresse du contrat dans DEPLOYED_CONTRACT_ADDRESS

Lancer le projet:

```
yarn install
yarn expo:web
```

Avertissement:

- Je n'ai pas réessayé de lancer l'app sous Android ou iOS, donc je ne sais pas si cela fonctionne. De toute façon la connection Metamask ne devrait pas fonctionner sous mobile.
- Certains liens vers les écrans sont limités à l'Owner. Pour voir les autres liens.
- On peut voir les liens dans le fichier AppNavigator.tsx
- /
- /catalogue
- /AdminCreate
- /AdminFormDao
- /OwnerHome
