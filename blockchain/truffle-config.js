module.exports = {
  plugins: ["truffle-security"],
  contracts_directory: "./contracts",
  contracts_build_directory: "./build",
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Default port for Ganache
      network_id: "*", // Match any network id
      gas: 6721975, // Gas limit
    },
  },
  compilers: {
    solc: {
      version: "^0.8.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "istanbul",
      },
    },
  },
};
