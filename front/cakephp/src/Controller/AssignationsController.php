<?php
namespace App\Controller;

use Cake\Event\Event;
use App\Controller\AppController;
use Cake\I18n\I18n;

/**
 * Assignations Controller
 *
 * @property \App\Model\Table\AssignationsTable $Assignations
 *
 * @method \App\Model\Entity\Assignation[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AssignationsController extends AppController
{

    public function beforeFilter(Event $event)
    {
        I18n::setLocale($this->request->getCookie('lang'));
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $assignations = $this->paginate($this->Assignations);

        $this->set(compact('assignations'));
    }

    /**
     * View method
     *
     * @param string|null $id Assignation id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $assignation = $this->Assignations->get($id, [
            'contain' => []
        ]);

        $this->set('assignation', $assignation);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add($url)
    {
        $this->loadModel('Polls');
        $poll = $this->Polls->find()->where(['url' => $url])->first();
        $this->set('poll', $poll);

         $id=$poll->poll_id;


        $this->loadModel('Gaps');
            $gaps = $this->Gaps->find()->where(['poll_id' => $id]); // Gaps of poll
        $this->set('gaps', $gaps);

        
        $this->loadModel('Users');
        $this->loadModel('Assignations');

        $pollGaps1 = $this->Gaps->find()->where(['poll_id' => $id]); //Gaps id of poll
        $assignations1 = $this->Assignations->find()->where(['gap_id in' => $pollGaps1->select('gap_id')]); // Assignated gaps of poll
        $users = $this->Users->find()->where(['user_id in'=>$assignations1->select('user_id')]); // All users (change to just participators)
        $this->set('users', $users->toArray());
    
        $pollGaps = $this->Gaps->find()->where(['poll_id' => $id])->select('gap_id'); //Gaps id of poll
        $assignations = $this->Assignations->find()->where(['gap_id in' => $pollGaps]); // Assignated gaps of poll
        $this->set('assignations', $assignations->toArray());

        $assignation = $this->Assignations->newEntity();
        
        if ($this->request->is('post')) {
            $assignations = $this->Assignations->newEntities($this->request->getData());
        
            foreach ($assignations as $assignation){
                if(!$this->Assignations->save($assignation)){
                    $this->Flash->error(__('Assignation could not be created. Please, try again.'));
                }
            }

            return $this->redirect(['controller'=>'Polls', 'action' => 'view', $url]);
        }

        $this->set(compact('assignation'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Assignation id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($url = null)
    {
        $this->loadModel('Polls');
        $poll = $this->Polls->find()->where(['url' => $url])->first();
        $this->set('poll', $poll);

         $id=$poll->poll_id;


        $this->loadModel('Gaps');
        $gaps = $this->Gaps->find()->where(['poll_id' => $id]); // Gaps of poll
        $this->set('gaps', $gaps);

        
        $this->loadModel('Users');
        $this->loadModel('Assignations');

        $pollGaps1 = $this->Gaps->find()->where(['poll_id' => $id]); //Gaps id of poll
        $assignations1 = $this->Assignations->find()->where(['gap_id in' => $pollGaps1->select('gap_id')]); // Assignated gaps of poll
        $users = $this->Users->find()->where(['user_id in'=>$assignations1->select('user_id'),'user_id !='=>$this->Auth->user('user_id')]); // All users (change to just participators)
        $this->set('users', $users->toArray());
    
        $pollGaps = $this->Gaps->find()->where(['poll_id' => $id])->select('gap_id'); //Gaps id of poll
        $assignations = $this->Assignations->find()->where(['gap_id in' => $pollGaps]); // Assignated gaps of poll
        $this->set('assignations', $assignations->toArray());

        $assignation = $this->Assignations->newEntity();
        
        $deletePollGaps = $this->Gaps->find()->select('gap_id')->where(['poll_id' => $id]); //Gaps id of poll
        $deleteAssignations = $this->Assignations->find()->where(['gap_id in' => $deletePollGaps]); // Assignated gaps of poll

        if ($this->request->is('post')) {
            $error="";
            $assignations = $this->Assignations->newEntities($this->request->getData());
        
            foreach($deleteAssignations as $delete){
                if($delete["user_id"]==$this->Auth->user('user_id')){
                    $assignationToDelete = $this->Assignations->get($delete["assignation_id"]);
                    if(!$this->Assignations->delete($assignationToDelete)){
                        $error=__('Assignation could not be created. Please, try again.');
                    }
                }
            }

            foreach ($assignations as $assignation){
                if(!$this->Assignations->save($assignation)){
                        $error=__('Assignation could not be created. Please, try again.');
                }
            }

            if($error!=""){
                $this->Flash->error($error);
            }else{
                $this->Flash->success(__('The assignation has been saved.'));
                return $this->redirect(['controller'=>'Polls', 'action' => 'view', $poll->url]);
            }
        }

        $this->set(compact('assignation'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Assignation id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $assignation = $this->Assignations->get($id);
        if ($this->Assignations->delete($assignation)) {
            $this->Flash->success(__('Assignation has been deleted.'));
        } else {
            $this->Flash->error(__('Assignation could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
