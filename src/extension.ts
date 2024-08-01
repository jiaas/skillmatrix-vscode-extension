import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	const createFullStructure = vscode.commands.registerCommand('extension.crearEstructuraFlutterCompleta', (uri: vscode.Uri) => {
		if (uri && uri.fsPath) {
			const projectPath = uri.fsPath;
			createSkillMatrixFullStructure(projectPath);
		}
	});

	const createFeatureStructure = vscode.commands.registerCommand('extension.crearEstructuraFeatureFlutter', (uri: vscode.Uri) => {
		if (uri && uri.fsPath) {
			const featurePath = uri.fsPath;
			createSkillMatrixFeatureStructure(featurePath);
		}
	});

	context.subscriptions.push(createFullStructure);
	context.subscriptions.push(createFeatureStructure);
}

function createSkillMatrixFullStructure(projectPath: string) {
	const structure = {
		'lib': {
			'main.dart': '',
			'settings': {
				'env_settings.dart': '',
			},
			'shared': {
				'models': {},
				'presentation': {},
				'providers': {},
				'services': {},
				'utils': {},
			},
			'src': {
				'feature_a': {
					'models': {},
					'presentation': {},
					'providers': {},
					'services': {},
				},
			},
		},
	};

	createDirectoriesAndFiles(projectPath, structure);
}

function createSkillMatrixFeatureStructure(featurePath: string) {
	let featureName = 'feature_a';
	let counter = 1;

	while (fs.existsSync(path.join(featurePath, featureName))) {
		if (counter < 26) {
			featureName = `feature_${String.fromCharCode(97 + counter)}`;
		} else {
			featureName = `feature_a${counter - 25}`;
		}
		counter++;
	}

	const structure = {
		[featureName]: {
			'models': {},
			'presentation': {},
			'providers': {},
			'services': {},
		},
	};

	createDirectoriesAndFiles(featurePath, structure);
	vscode.window.showInformationMessage(`Estructura de User-Flow Efectivo '${featureName}' creada con éxito.`);
}

function createDirectoriesAndFiles(basePath: string, structure: any) {
	for (const name in structure) {
		const value = structure[name];
		const newPath = path.join(basePath, name);

		if (typeof value === 'object') {
			if (!fs.existsSync(newPath)) {
				fs.mkdirSync(newPath);
			}
			createDirectoriesAndFiles(newPath, value);
		} else {
			fs.writeFileSync(newPath, value);
		}
	}
}

export function deactivate() { }