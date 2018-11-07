<?php
namespace App\Controller;

use Cake\Event\Event;
use App\Controller\AppController;
use Cake\I18n\I18n;

/**
 * Gaps Controller
 *
 * @property \App\Model\Table\GapsTable $Gaps
 *
 * @method \App\Model\Entity\Gap[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class GapsController extends AppController
{
    public function beforeFilter(Event $event)
    {
        I18n::setLocale($this->request->getCookie('lang'));
        parent::beforeFilter($event);
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $gaps = $this->paginate($this->Gaps);

        $this->set(compact('gaps'));
    }

    /**
     * View method
     *
     * @param string|null $id Gap id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $gap = $this->Gaps->get($id, [
            'contain' => []
        ]);

        $this->set('gap', $gap);
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
        $this->set('poll_id', $poll->poll_id);

        $gap = $this->Gaps->newEntity();
        if ($this->request->is('post')) {
            $error="";
            $gaps = $this->Gaps->newEntities($this->request->getData());

            foreach($gaps as $gap){
                if($gap->end_date <= $gap->start_date){
                    $error=__("End date has to be later than start date.");
                    break;
                }
                
                if (!$this->Gaps->save($gap)) {
                    $error="The gap could not be saved. Please, try again.";
                    break;
                }
            }

            if($error!=""){
                $this->Flash->error($error);
            }else{
                $this->Flash->success(__('The gaps have been saved.'));
                return $this->redirect(['controller'=>'polls', 'action' => 'edit', $poll->url]);
            }
        }
        $this->set(compact('gap'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Gap id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $gap = $this->Gaps->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $gap = $this->Gaps->patchEntity($gap, $this->request->getData());
            if ($this->Gaps->save($gap)) {
                $this->Flash->success(__('The gap has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The gap could not be saved. Please, try again.'));
        }
        $this->set(compact('gap'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Gap id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $gap = $this->Gaps->get($id);
        if ($this->Gaps->delete($gap)) {
            $this->Flash->success(__('The gap has been deleted.'));
        } else {
            $this->Flash->error(__('The gap could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
