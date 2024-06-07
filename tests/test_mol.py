import funcnodes_rdkit as fn_rdkit
import funcnodes as fn
import rdkit.Chem as Chem
import unittest


class TestMol(unittest.IsolatedAsyncioTestCase):
    async def test_mol2smiles(self):
        mol = Chem.MolFromSmiles("CCO")
        node = fn_rdkit.mol.mol2smiles()
        node.inputs["mol"].value = mol
        await node
        smiles = node.outputs["smiles"].value
        self.assertEqual(smiles, "CCO")

    async def test_smiles2mol(self):
        smiles = "CCO"
        node = fn_rdkit.mol.smiles2mol()
        node.inputs["smiles"].value = smiles
        await node
        mol = node.outputs["mol"].value
        self.assertEqual(mol.GetNumAtoms(), 3)
