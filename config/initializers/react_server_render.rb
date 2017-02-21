Rails.application.config.assets.precompile += %w( server_rendering.js )

Rails.application.config.react.server_renderer_options = {
    files: ['server_rendering.js'] # files to load for prerendering
}