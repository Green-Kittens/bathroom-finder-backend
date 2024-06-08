{
  description = "bathroom-finder-backend development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        config.allowUnfree = true;
      };
    in
      with pkgs; {
        devShells.default = mkShell {
          system = "x86_64-linux";
          packages = with nixpkgs; [
            mongodb
          ];

          shellHook = ''
            exec fish
          '';
        };
      });
}
