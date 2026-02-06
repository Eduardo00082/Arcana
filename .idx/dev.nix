{ pkgs, ... }: {
  channel = "stable-24.05"; # ou "unstable" se quiser o cutting-edge
  packages = [
    pkgs.nodejs_22
  ];
  idx = {
    extensions = [
      "bradlc.vscode-tailwindcss"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}