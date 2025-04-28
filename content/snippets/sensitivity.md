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
