---
id: cd109e09-de09-45f2-8d90-4d7b32599287
title: Sensitivity analysis model
description: Na.
datetimeCreate: 2025-04-28 14:31:13
datetimeUpdate: 2025-04-28 17:24:18
logo: matlab.svg
created: 2025-04-28T18:14
updated: 2025-04-28T18:14
---

```matlab title="sensitivity.m"
% Parameters and Bounds
params = {'a', 'b', 'c', 'd'};
bounds = [0.1 2; 0.05 0.5; 0.1 1; 0.1 1];
r = 4; k = 10;

% Generate Samples
samples = morris_sampling(bounds, k, r);

% Simulate Model
output = arrayfun(@(i) simulate_model(samples(i,:)), 1:size(samples,1));

% Compute Sensitivity Indices
[mu, sigma] = morris_analysis(samples, output, bounds, r);

% Plot
figure;
hold on;

% Sort parameters by sensitivity magnitude for better visualization
[~, sortIdx] = sort(abs(mu), 'descend');
mu_sorted = mu(sortIdx);
sigma_sorted = sigma(sortIdx);
params_sorted = params(sortIdx);

% Create colored bars (blue = positive, red = negative)
colors = zeros(length(mu_sorted), 3);
colors(mu_sorted > 0, :) = repmat([0 0.4470 0.7410], sum(mu_sorted > 0), 1); % Blue
colors(mu_sorted < 0, :) = repmat([0.8500 0.3250 0.0980], sum(mu_sorted < 0), 1); % Red

b = bar(categorical(params_sorted), mu_sorted, 'FaceColor', 'flat');
b.CData = colors;

% Add error bars showing standard deviation (σ)
errorbar(1:length(mu_sorted), mu_sorted, sigma_sorted, 'k.', 'LineWidth', 1.5);

% Add sensitivity values on top of bars
for i = 1:length(mu_sorted)
    if mu_sorted(i) > 0
        text(i, mu_sorted(i)+0.05*max(mu_sorted), sprintf('%.2f', mu_sorted(i)), ...
            'HorizontalAlignment', 'center', 'VerticalAlignment', 'bottom');
    else
        text(i, mu_sorted(i)-0.05*max(mu_sorted), sprintf('%.2f', mu_sorted(i)), ...
            'HorizontalAlignment', 'center', 'VerticalAlignment', 'top');
    end
end

% Format plot
hline = refline(0, 0); % Reference line at y=0
hline.Color = [0.5 0.5 0.5];
title('Parameter Sensitivity with Directional Influence');
ylabel('Sensitivity Index (\mu)');
xlabel('Parameters');
grid on;
set(gca, 'FontSize', 12);

function output = simulate_model(params)
    [~, x, ~] = ABCpredatorprey(params(1), params(2), params(3), params(4), 0.9, 0.9, [0 50], 10, 5, 0.1);
    output = max(x);
end

function samples = morris_sampling(bounds, k, r)
    num_params = size(bounds,1);
    delta = r/(2*(r-1));
    samples = [];
    for t = 1:k
        base = bounds(:,1) + rand(num_params,1).*(bounds(:,2)-bounds(:,1));
        order = randperm(num_params);
        traj = base';
        for p = order
            step = (bounds(p,2)-bounds(p,1))/(r-1);
            new = base; new(p) = base(p) + (rand()>0.5)*delta*step;
            new(p) = min(max(new(p), bounds(p,1)), bounds(p,2));
            traj = [traj; new'];
            base = new;
        end
        samples = [samples; traj];
    end
end

function [mu, sigma] = morris_analysis(samples, output, bounds, r)
    num_params = size(bounds,1);
    num_traj = size(samples,1)/(num_params+1);
    ee = zeros(num_traj, num_params);
    for t = 1:num_traj
        idx = (t-1)*(num_params+1) + (1:num_params+1);
        traj = samples(idx,:);
        out = output(idx);
        for p = 1:num_params
            d = find(diff(traj(:,p)) ~= 0);
            if ~isempty(d)
                ee(t,p) = (out(d+1) - out(d)) / (diff(traj(d:d+1,p))/(bounds(p,2)-bounds(p,1))*(r-1));
            end
        end
    end
    mu = mean(ee); sigma = std(ee);
end

function [t, x, y] = ABCpredatorprey(a, b, c, d, alpha, beta, tspan, x0, y0, dt)
    t = tspan(1):dt:tspan(2);
    N = length(t);
    x = zeros(1, N); x(1) = x0;
    y = zeros(1, N); y(1) = y0;
    B_alpha = 1; B_beta = 1; % Assume B(α)=1 for simplicity
    gamma_alpha = gamma(alpha); 
    gamma_beta = gamma(beta);

    for k = 1:N-1
        % PREDICTOR STEP
        f_x = a*x(k) - b*x(k)*y(k);
        f_y = c*x(k)*y(k) - d*y(k);
        
        % X prediction term (history from 1 to k)
        x_hist = a*x(1:k) - b*x(1:k).*y(1:k);
        kernel_x = (k:-1:1).^alpha - (k-1:-1:0).^alpha; % Adjusted indices
        x_pred = x(1) + (1-alpha)/B_alpha*f_x ...
            + (alpha/(B_alpha*gamma_alpha)) * sum(x_hist .* kernel_x) * dt^alpha;
        
        % Y prediction term
        y_hist = c*x(1:k).*y(1:k) - d*y(1:k);
        kernel_y = (k:-1:1).^beta - (k-1:-1:0).^beta; % Adjusted indices
        y_pred = y(1) + (1-beta)/B_beta*f_y ...
            + (beta/(B_beta*gamma_beta)) * sum(y_hist .* kernel_y) * dt^beta;
        
        % CORRECTOR STEP (simplified example)
        f_x_corr = a*x_pred - b*x_pred*y_pred;
        f_y_corr = c*x_pred*y_pred - d*y_pred;
        
        x(k+1) = x(1) + (1-alpha)/B_alpha*f_x_corr ...
            + (alpha/(B_alpha*gamma_alpha)) * sum([x_hist, f_x_corr] ...
            .* [kernel_x, 1]) * dt^alpha;
        
        y(k+1) = y(1) + (1-beta)/B_beta*f_y_corr ...
            + (beta/(B_beta*gamma_beta)) * sum([y_hist, f_y_corr] ...
            .* [kernel_y, 1]) * dt^beta;
    end
end
```


```matlab title=sensitivity_morris_ode45.m
%% Parameter and Morris Method Setup
% Define parameter names and bounds [min, max] for a, b, c, d
param_names = {'a','b','c','d'};
lb = [0.5, 0.5, 0.5, 0.5];    % example lower bounds
ub = [2.0, 2.0, 2.0, 2.0];    % example upper bounds

p = numel(param_names);      % number of parameters (here 4)
r = 10;                      % number of Morris trajectories (sample paths)
delta = 0.2;                 % step size (in normalized [0,1] space)
% Initialize arrays to collect elementary effects for each parameter
effects = zeros(r, p);

% Seed the random number generator for reproducibility
rng(0);  % (Octave: rand('seed',0);)

%% Predator-Prey Model Definition
% Lotka-Volterra system: dx/dt = a*x - b*x*y; dy/dt = c*x*y - d*y
% Define a function handle for simulation
predatorPrey = @(t, y, a, b, c, d) [ ...
    a*y(1) - b*y(1)*y(2); ...
    c*y(1)*y(2) - d*y(2) ];

% Simulation settings
tspan = [0, 30];             % time span for ODE integration
y0 = [40; 9];                % initial [prey; predator] populations

%% Generate Morris Sample Trajectories and Compute Effects
for k = 1:r
    % Random base point in [0,1]^p for trajectory k
    x_base = rand(1, p);
    % Convert base point to actual parameter values
    params_base = lb + x_base .* (ub - lb);
    % Simulate model at base point
    % Note: solve ODE using ode45 (MATLAB) or lsode/ode45 (Octave)
    [~, Y_base] = ode45(@(t,y) predatorPrey(t, y, ...
                           params_base(1), params_base(2), ...
                           params_base(3), params_base(4)), tspan, y0);
    % Compute output metric (e.g. max predator population)
    f_base = max(Y_base(:,2));
    
    % Randomize the order of parameter perturbation in this trajectory
    order = randperm(p);
    for j = 1:p
        i = order(j);  % parameter index to perturb
        % Determine perturbation direction: +Δ if possible, else -Δ
        if x_base(i) <= 1 - delta
            x_new = x_base;
            x_new(i) = x_base(i) + delta;
        else
            x_new = x_base;
            x_new(i) = x_base(i) - delta;
        end
        % Convert new point to parameter values
        params_new = lb + x_new .* (ub - lb);
        % Simulate model at new point
        [~, Y_new] = ode45(@(t,y) predatorPrey(t, y, ...
                              params_new(1), params_new(2), ...
                              params_new(3), params_new(4)), tspan, y0);
        f_new = max(Y_new(:,2));  % output metric at perturbed point
        
        % Compute elementary effect for parameter i (difference quotient)
        % Using Δ in the normalized space, so effect = (f_new - f_base)/Δ
        effects(k, i) = (f_new - f_base) / delta;
        
        % Update base point for next step in the same trajectory
        x_base = x_new;
        f_base = f_new;
    end
end

%% Compute Sensitivity Indices (μ and σ)
mu = mean(effects, 1);         % mean elementary effect for each param
sigma = std(effects, 0, 1);    % std deviation of effects for each param

%% Plot the Results as a Bar Graph
figure;
bar(mu, 'FaceColor', [0.6 0.8 1.0]);  % colored bars for μ
hold on;
% Add error bars for σ on each bar
errorbar(1:p, mu, sigma, '.k', 'LineWidth', 1.5);
hold off;
xticks(1:p);
xticklabels(param_names);
xlabel('Parameter');
ylabel('Mean elementary effect \mu');
title('Morris Sensitivity Analysis (Mean \mu with Std \sigma)');
grid on;

% Optional: draw a horizontal line at zero
yline(0, '--k');
```

